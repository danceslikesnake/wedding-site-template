'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var fs = require('fs');

const getAllRSVPS = async () => {
  let rsvps = await dynamoDb.scan({
    TableName: 'Rsvps'
  }).promise();

  console.log(JSON.stringify(rsvps.Items));
  //const csv = json2csvParser.parse(rsvps);
  fs.writeFile('myjsonfile.json', rsvps, 'utf8', (error) =>{
    if(error){
      throw error;
    }
    process.exit(0);
  });

};

getAllRSVPS().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});