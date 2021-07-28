'use strict';

// reusable function which returns the first message on the SQS queue

const AWS = require('aws-sdk');
const SQS = AWS.SQS;

async function get() {
  const queue = new SQS({
    endpoint: 'http://localhost:9324',
    region: 'eu-west-2',
    accessKeyId: 'example',
    secretAccessKey: 'example'
  });
  // return await queue.receiveMessage({QueueUrl: 'http://localhost:9324/queue/first-queue'}).promise();
  const item = await queue.receiveMessage({QueueUrl: 'http://localhost:9324/queue/first-queue'}).promise();
  // eslint-disable-next-line no-console
  console.log(item.Messages);
}

get();
