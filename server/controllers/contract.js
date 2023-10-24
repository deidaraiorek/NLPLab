const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const nodemailer = require('nodemailer');

// Setting up the AWS configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const CONTRACT_REQUESTS_TABLE_NAME = "ContractRequests"; // Change this to your actual DynamoDB table name

exports.uploadSignedAgreement = (req, res) => {
    const params = {
        Bucket: "contractsnlplab", // Replace with your actual bucket name
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
    };

    s3.upload(params, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        const requestId = uuidv4();
        const request = {
            id: requestId,
            fileName: req.file.originalname,
            fileUrl: data.Location,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            title: req.body.research,
            link: req.body.researchLink,
        };

        const putParams = {
            TableName: CONTRACT_REQUESTS_TABLE_NAME,
            Item: request,
        };

        dynamoDB.put(putParams, function(err, data) {
            if (err) {
                console.error("Error storing contract request:", err);
                return res.status(500).send("Error storing contract request");
            } else {
                console.log("Successfully stored contract request", data);
                res.status(200).send(data);
            }
        });
    });
};

exports.getContractRequests = async (req, res) => {
    const scanParams = {
        TableName: CONTRACT_REQUESTS_TABLE_NAME,
    };

    try {
        const result = await dynamoDB.scan(scanParams).promise();
        console.log(result.Items);
        res.json({ requests: result.Items });
    } catch (error) {
        console.error("Error fetching contract requests:", error);
        res.status(500).send("Error fetching contract requests");
    }
};

exports.approveContract = async (req, res) => {
    try {
        const { userEmail, projectName } = req.body;

        // Generate a presigned URL
        const s3 = new AWS.S3();
        const urlParams = {
            Bucket: 'projectdatanlplab',
            Key: projectName,  // As projectName includes the extension already
            Expires: 30
        };
        const presignedUrl = await s3.getSignedUrlPromise('getObject', urlParams);

        // Send email with the presigned URL
        const mailOptions = {
            Source: "HuuDang.Pham@moffitt.org",
            Destination: {
                ToAddresses: [userEmail],
            },
            Message: {
                Subject: {
                    Data: "NLP Lab: Request Approved",
                },
                Body: {
                    Text: {
                        Data: `Your request has been approved. You can access it here: ${presignedUrl}`,
                    },
                },
            },
        };

        const sendEmailCommand = new SendEmailCommand(mailOptions);
        await sesClient.send(sendEmailCommand);
        console.log("Email sent successfully");
        const requestId = req.body.id;

        const deleteParams = {
            TableName: CONTRACT_REQUESTS_TABLE_NAME,
            Key: {
                "id": requestId
            }
        };

        // Deleting the contract request after it's approved.
        await dynamoDB.delete(deleteParams).promise();
        console.log("Contract request deleted successfully after approval.");
        return res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error approving contract request:", error);
        return res.status(500).send("Error approving contract request");
    }
};

exports.denyContract = async (req, res) => {
    try {
        const { userEmail } = req.body;

        // Set up the content for the denial email
        const mailOptions = {
            Source: "HuuDang.Pham@moffitt.org", // The email address you're sending from
            Destination: {
                ToAddresses: [userEmail], // The recipient's email address
            },
            Message: {
                Subject: {
                    Data: "NLP Lab: Request Denied", // The subject line for the email
                },
                Body: {
                    Text: {
                        Data: "Your request has been denied.", // The main body text for the email
                    },
                },
            },
        };

        const sendEmailCommand = new SendEmailCommand(mailOptions);

        // Send the email through SES
        await sesClient.send(sendEmailCommand);
        console.log("Denial email sent successfully");
        const requestId = req.body.id;
        const deleteParams = {
            TableName: CONTRACT_REQUESTS_TABLE_NAME,
            Key: {
                "id": requestId // assuming 'id' is the key for the item
            }
        };

        // Deleting the contract request after it's approved.
        await dynamoDB.delete(deleteParams).promise();
        console.log("Contract request deleted successfully after approval.");
        return res.status(200).send("Email sent successfully");

    } catch (error) {
        console.error("Error denying contract request:", error);
        return res.status(500).send("Error denying contract request");
    }
};