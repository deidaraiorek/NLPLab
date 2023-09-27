const express = require("express");
const multer = require("multer");
const cors = require("cors");
const AWS = require("aws-sdk");
const { SESClient } = require("@aws-sdk/client-ses");
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid"); // for generating unique IDs
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1", // Replace with your desired AWS region
});
const sesClient = new SESClient({
  region: "us-east-1", // Replace with your AWS SES region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});



const dynamoDB = new AWS.DynamoDB.DocumentClient();

const CONTRACT_REQUESTS_TABLE_NAME = "hit"; // Replace with your DynamoDB table name

app.post("/api/upload-signed-agreement", upload.single("file"), (req, res) => {
  const params = {
    Bucket: "mangutget",
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
    try {
      // Store the request details in DynamoDB
      const requestId = uuidv4(); // Generate a unique request ID
      const request = {
        id: requestId,
        fileName: req.file.originalname,
        fileUrl: data.Location,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        title: req.body.research,
        link: req.body.researchLink,
        
        // Add other request details as needed (e.g., user name, email, status).
      };


      const putParams = {
        TableName:CONTRACT_REQUESTS_TABLE_NAME,
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
      

      // res = await dynamoDB.put(putParams).promise();
      // console.log("Successfully stored contract request", rest)
    } catch (error) {
      console.error("Error storing contract request:", error);
      res.status(500).send("Error storing contract request");
    }
  });
});

// Endpoint for fetching contract requests (admin dashboard)
app.get("/api/contract-requests", async (req, res) => {
  try {
    // Retrieve the list of contract requests from DynamoDB
    const scanParams = {
      TableName: CONTRACT_REQUESTS_TABLE_NAME,
    };

    const result = await dynamoDB.scan(scanParams).promise();
    const requests = result.Items;

    res.json({ requests });
  } catch (error) {
    console.error("Error fetching contract requests:", error);
    res.status(500).send("Error fetching contract requests");
  }
});
// Update the email sending logic
app.post("/api/approve-contract", async (req, res) => {
  try {
    const { userEmail, link } = req.body;

    // Implement logic to mark the request as approved in DynamoDB or your database

    // Send an email notification to the user
    const mailOptions = {
      Source: "HuuDang.Pham@moffitt.org", // Use the verified sender email
      Destination: {
        ToAddresses: [userEmail], // Recipient's email
      },
      Message: {
        Subject: {
          Data: "Contract Request Approved",
        },
        Body: {
          Text: {
            Data: `Your contract request has been approved. You can access it here: ${link}`,
          },
        },
      },
    };

    const sendEmailCommand = new SendEmailCommand(mailOptions);

    try {
      await sesClient.send(sendEmailCommand);
      console.log("Email sent successfully");
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
  } catch (error) {
    console.error("Error approving contract request:", error);
    res.status(500).send("Error approving contract request");
  }
});


app.post("/api/deny-contract", async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Implement logic to mark the request as denied in DynamoDB or your database

    // Send an email notification to the user
    const transporter = nodemailer.createTransport({
      service: "email-smtp.us-east-1.amazonaws.com", // Replace with your email service (e.g., Gmail)
      auth: {
        user: "deidara",
        pass: "@Phamhuudangt1k11",
      },
    });

    const mailOptions = {
      from: "HuuDang.Pham@moffitt.org",
      to: userEmail,
      subject: "Contract Request Denied",
      text: "Your contract request has been denied.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error denying contract request:", error);
    res.status(500).send("Error denying contract request");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
