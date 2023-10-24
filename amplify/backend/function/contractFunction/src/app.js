const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const multer = require('multer');
const AWS = require('aws-sdk');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// AWS Setup
AWS.config.update({ region: 'us-east-1' });

const sesClient = new SESClient({ region: 'us-east-1' });
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const CONTRACT_REQUESTS_TABLE_NAME = 'hit';

app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post('/contract/upload-signed-agreement', upload.single('file'), (req, res) => {
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
    try {
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
    } catch (error) {
      console.error("Error storing contract request:", error);
      res.status(500).send("Error storing contract request");
    }
  });
});

app.get('/contract/contract-requests', async (req, res) => {
  try {
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

app.get('/contract', (req, res) => {
  try {
    res.status(200).send('Hello, World!');
  } catch (error) {
    console.error("Error sending greeting:", error);
    res.status(500).send("Error sending greeting");
  }
});

app.post('/contract/approve-contract', async (req, res) => {
  try {
    const { userEmail, link } = req.body;
    const mailOptions = {
      Source: "HuuDang.Pham@moffitt.org",
      Destination: {
        ToAddresses: [userEmail],
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

app.post('/contract/deny-contract', async (req, res) => {
  try {
    const { userEmail } = req.body;
    const transporter = nodemailer.createTransport({
      service: "email-smtp.us-east-1.amazonaws.com",
      auth: {
        user: "deidara",
        pass: "@Phamhuudangt1k11",
      },
    })
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

app.listen(3000, function() {
    console.log("App started");
});

module.exports = app;
