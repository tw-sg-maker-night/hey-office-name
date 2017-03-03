"use strict";

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

function getName(userId, callback) {
  const params = {
    TableName: 'HeyOfficeUsers',
    Key: { "userId": userId }
  };
  dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log("Error = " + inspect(error))
        callback("unknown")
        return
      }
      var usersName = result.Item.name || "unknown"
      callback(usersName)
  })
}

module.exports = {
  getName: getName
};
