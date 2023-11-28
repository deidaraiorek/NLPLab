// models/User.js

const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

class User {
  constructor(email, passwordHash, isAdmin) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.isAdmin = isAdmin;
  }

  // Save a user to the database
  async save() {
    const params = {
      TableName: 'Users', // make sure 'Users' is your actual DynamoDB table name
      Item: {
        email: this.email,
        passwordHash: this.passwordHash,
        isAdmin: this.isAdmin,
      },
    };
    return dynamoDB.put(params).promise();
  }

  // Find a user by email
  static async findByEmail(email) {
    const params = {
      TableName: 'Users',
      Key: {
        email: email,
      },
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  // Verify the password
  async verifyPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

module.exports = User;
