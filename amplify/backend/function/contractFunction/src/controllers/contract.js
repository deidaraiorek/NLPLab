// controllers/contractController.js

const AWS = require('aws-sdk');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { v4: uuidv4 } = require('uuid');

// AWS configuration update with environment variables
AWS.config.update({
  region: 'us-east-1',
});

// Initialize AWS services
const sesClient = new SESClient({ region: 'us-east-1' });
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const CONTRACT_REQUESTS_TABLE_NAME = "ContractRequests"; // DynamoDB table name

// Controllers for your routes

// POST route for uploading signed agreements
exports.uploadSignedAgreement = (req, res) => {
  const params = {
    Bucket: "contractsnlplab", 
    Key: `${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer, 
    ContentType: req.file.mimetype,
    ACL: "public-read",
  };
  console.log(req.file, params);

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

// GET route for fetching contract requests
exports.getContractRequests = async (req, res) => {
    const scanParams = {
        TableName: CONTRACT_REQUESTS_TABLE_NAME,
      };
    
      try {
        const result = await dynamoDB.scan(scanParams).promise();
        res.json({ requests: result.Items });
      } catch (error) {
        console.error("Error fetching contract requests:", error);
        res.status(500).send("Error fetching contract requests");
      }
};

// POST route for approving contracts
exports.approveContract = async (req, res) => {
    try {
        const { userEmail, projectName } = req.body;
    
        // Generate presigned URL for project data
        const urlParams = {
          Bucket: 'projectdatanlplab', // appropriate bucket containing the project data
          Key: projectName, // this assumes the projectName includes the file type extension
          Expires: 86400, // URL expiry time in seconds
        };
        const presignedUrl = await s3.getSignedUrlPromise('getObject', urlParams);
    
        // Setup SES email
        const mailOptions = {
          Source: "HuuDang.Pham@moffitt.org", // sender's email address
          Destination: { ToAddresses: [userEmail] }, // recipient's email address
          Message: {
            Subject: { Data: "NLP Lab: Request Approved" }, // email subject
            Body: {
              Text: {
                Data: `Your request has been approved. You can access it here: ${presignedUrl}`, // email body with URL
              },
            },
          },
        };
    
        const sendEmailCommand = new SendEmailCommand(mailOptions);
        await sesClient.send(sendEmailCommand); // Send email
        console.log("Email sent successfully");
    
        // Delete the approved contract request from DynamoDB
        const requestId = req.body.id; // Unique request ID from body
        const deleteParams = {
          TableName: CONTRACT_REQUESTS_TABLE_NAME,
          Key: { "id": requestId },
        };
    
        await dynamoDB.delete(deleteParams).promise(); // Delete operation
        console.log("Contract request deleted successfully after approval.");
        return res.status(200).send("Email sent successfully");
      } catch (error) {
        console.error("Error approving contract request:", error);
        return res.status(500).send("Error approving contract request");
      }
};

// POST route for denying contracts
exports.denyContract = async (req, res) => {
    try {
        const { userEmail } = req.body;
        // Set up SES email content
        const mailOptions = {
          Source: "HuuDang.Pham@moffitt.org", // sender's email address
          Destination: { ToAddresses: [userEmail] }, // recipient's email address
          Message: {
            Subject: { Data: "NLP Lab: Request Denied" }, // email subject
            Body: {
              Text: {
                Data: "Your request has been denied.", // email body
              },
            },
          },
        };
    
        const sendEmailCommand = new SendEmailCommand(mailOptions);
        await sesClient.send(sendEmailCommand); // Send email
        console.log("Denial email sent successfully");
    
        // Delete the denied contract request from DynamoDB
        const requestId = req.body.id; // Unique request ID from body
        const deleteParams = {
          TableName: CONTRACT_REQUESTS_TABLE_NAME,
          Key: { "id": requestId },
        };
    
        await dynamoDB.delete(deleteParams).promise(); // Delete operation
        console.log("Contract request deleted successfully after denial.");
        return res.status(200).send("Email sent successfully");
      } catch (error) {
        console.error("Error denying contract request:", error);
        return res.status(500).send("Error denying contract request");
      }
};
