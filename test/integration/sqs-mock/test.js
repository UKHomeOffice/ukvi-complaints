'use strict';

const AWS = require('aws-sdk');
const SQS = AWS.SQS;

const queue = new SQS({
  endpoint: 'http://localhost:9324',
  region: 'eu-west-2', // it does not matter
  accessKeyId: 'example',
  secretAccessKey: 'example'
});

// (async () => {
//   const queues = await queue.receiveMessage({QueueUrl: 'http://localhost:9324/queue/first-queue'}).promise();
//   console.log(queues);
// })();

(async () => {
  const queues = await queue.listQueues().promise();
  console.log(queues);
})();
