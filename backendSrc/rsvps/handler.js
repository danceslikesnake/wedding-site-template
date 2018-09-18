'use strict';

const _ = require('lodash');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'api-handler' });
const moment = require('moment');

module.exports.getInvitation = async (event, context, callback) => {
  log.info({ event });
  const pathParameters = event.path || {};
  const rsvpCode = pathParameters.rsvpCode || undefined;
  if (!rsvpCode) {
    return callback({
      statusCode: 404,
      body: 'rsvpCode must be present'
    });
  }
  const getParams = {
    TableName: 'Rsvps',
    Key: {
      rsvpCode
    }
  };

  try {
    let result = await dynamoDb.get(getParams).promise();
    const response = {
      statusCode: 200,
      body: result.Item
    };
    return callback(null, response);
  } catch (error) {
    log.info({ error, event }, error.message);
    return callback(error);
  }
};

module.exports.updateInvitation = (event, context, callback) => {
  log.info({ event }, 'updateInvitation');
  const body = event.body;
  const rsvpCode = body.rsvpCode || undefined;
  const updateParams = {
    TableName: 'Rsvps',
    Key: {
      rsvpCode
    },
    UpdateExpression: 'SET #guests = :guests, #lastUpdated = :lastUpdated, #customNote = :customNote, #email = :email', 
    ExpressionAttributeNames: {
      '#guests': 'guests',
      '#customNote': 'customNote',
      '#lastUpdated': 'lastUpdated',
      '#email': 'email'
    },
    ExpressionAttributeValues: {
      ':guests': body.guests,
      ':customNote': body.additionalNotes,
      ':email': body.emailAddress,
      ':lastUpdated': moment.utc().toISOString(),
    }
  };
  dynamoDb.update(updateParams, (error, result) => {
    if (error) return callback(error);
    return callback(null, result);
  });
};

// let rspv = {
//   party: 2,
//   email: '',
//   guests: [{
//     firstName:'',
//     lastName:'',
//     availability: '',
//     mealSelection: '',
//   }],
//   customNote: ''
// };
