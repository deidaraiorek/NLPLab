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


exports.uploadSignedAgreement = (req, res) => {
    const params = {
      Bucket: "contractsnlplab", 
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
  
      dynamoDB.put(putParams, async function(err, data) {
        if (err) {
          console.error("Error storing contract request:", err);
          return res.status(500).send("Error storing contract request");
        } else {
          console.log("Successfully stored contract request", data);
  
          // Send notification email to admin
          const adminEmail = "TuanDung.Le@moffitt.org";
          const notificationMessage = `New contract request uploaded:\n\nUser: ${req.body.userName}\nEmail: ${req.body.userEmail}\nTitle: ${req.body.research}`;
          const mailOptions = {
            Source: "HuuDang.Pham@moffitt.org",
            Destination: { ToAddresses: [adminEmail] },
            Message: {
              Subject: { Data: "New Request Notification" },
              Body: {
                Text: { Data: notificationMessage },
              },
            },
          };
  
          const sendEmailCommand = new SendEmailCommand(mailOptions);
          try {
            await sesClient.send(sendEmailCommand);
            console.log("Admin notification email sent successfully");
          } catch (notificationError) {
            console.error("Error sending notification email:", notificationError);
            // Handle the notification error appropriately
          }
  
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
// POST route for approving contracts
exports.approveContract = async (req, res) => {
  try {
      const { userEmail, projectName, userName } = req.body;
  
      // Generate presigned URL for project data
      const urlParams = {
          Bucket: 'projectdatanlplab',
          Key: projectName, 
          Expires: 86400,
      };
      const presignedUrl = await s3.getSignedUrlPromise('getObject', urlParams);
  
      // Setup SES email
      const approvalMessage = `Dear ${userName},\n\nYour request has been approved. You can access it here: ${presignedUrl}`;
      const mailOptions = {
          Source: "HuuDang.Pham@moffitt.org",
          Destination: { ToAddresses: [userEmail] },
          Message: {
              Subject: { Data: "NLP Lab: Request Approved" },
              Body: {
                  Text: { Data: approvalMessage },
              },
          },
      };
  
      const sendEmailCommand = new SendEmailCommand(mailOptions);
      await sesClient.send(sendEmailCommand);
      console.log("Email sent successfully");
  
      // Delete the approved contract request from DynamoDB
      const requestId = req.body.id;
      const deleteParams = {
          TableName: CONTRACT_REQUESTS_TABLE_NAME,
          Key: { "id": requestId },
      };
  
      await dynamoDB.delete(deleteParams).promise();
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
      const { userEmail, userName } = req.body;
      
      // Set up SES email content
      const denialMessage = `Dear ${userName},\n\nYour request has been denied.`;
      const mailOptions = {
          Source: "HuuDang.Pham@moffitt.org",
          Destination: { ToAddresses: [userEmail] },
          Message: {
              Subject: { Data: "NLP Lab: Request Denied" },
              Body: {
                  Text: { Data: denialMessage },
              },
          },
      };
  
      const sendEmailCommand = new SendEmailCommand(mailOptions);
      await sesClient.send(sendEmailCommand);
      console.log("Denial email sent successfully");
  
      // Delete the denied contract request from DynamoDB
      const requestId = req.body.id;
      const deleteParams = {
          TableName: CONTRACT_REQUESTS_TABLE_NAME,
          Key: { "id": requestId },
      };
  
      await dynamoDB.delete(deleteParams).promise();
      console.log("Contract request deleted successfully after denial.");
      return res.status(200).send("Email sent successfully");
  } catch (error) {
      console.error("Error denying contract request:", error);
      return res.status(500).send("Error denying contract request");
  }
};
