'use strict';

var util = require('util')
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function inspect(obj) {
  return util.inspect(obj, false, null)
}

function responseWithContent(content) {
    return {
        sessionAttributes: {},
        dialogAction: {
            type: "Close",
            fulfillmentState: "Fulfilled",
            message: {
                contentType: "PlainText",
                content: content
            }
        }
    }
}

module.exports.who_am_i = (event, context, callback) => {
  console.log("Event = " + inspect(event))

  const params = {
    TableName: 'HeyOfficeUsers',
    Key: { "userId": event.userId }
  };
  dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log("Error = " + inspect(error))
        callback(null, responseWithContent("Sorry, I'm not sure what your name is."))
        return
      }

      var usersName = result.Item.name || "unknown"
      callback(null, responseWithContent("Your name is " + usersName))
  })
};
