// Required libraries
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const multer = require('multer');
const AWS = require('aws-sdk');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { v4: uuidv4 } = require('uuid');
const contractRoutes = require('./routes/contract');
const authRoutes = require('./routes/auth');

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// AWS configuration update with environment variables
AWS.config.update({
  region: 'us-east-1',
});

const sesClient = new SESClient({ region: 'us-east-1' }); // SES client for email
const s3 = new AWS.S3(); // S3 service instance
const dynamoDB = new AWS.DynamoDB.DocumentClient(); // DynamoDB service instance
const CONTRACT_REQUESTS_TABLE_NAME = "ContractRequests"; // DynamoDB table name

app.use(express.json());
app.use('/contract/', contractRoutes)
app.use('/contract/user', authRoutes);
// Start the server
app.listen(3000, function() {
    console.log("App started");
});

// Export your express server so you can use it in the lambda function
module.exports = app;
