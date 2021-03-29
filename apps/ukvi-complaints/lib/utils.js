'use strict';
const { v4: uuidv4 } = require('uuid');
const Validator = require('jsonschema').Validator;
const { Producer } = require('sqs-producer');
const config = require('../../../config');
const decsSchema = require('../schema/decs.json');

const validateAgainstSchema = (complaintData) => {
  try {
    const validator = new Validator();
    const valid = validator.validate(complaintData, decsSchema);

    if (valid.errors.length > 0) {
      throw new Error(valid.errors);
    }

    return true;
  } catch (err) {
    throw err;
  }
};


const sendToQueue = (complaintData) => {
  try {

    const producer = Producer.create(config.awsSqs);

    return new Promise((resolve, reject) => {
      producer.send(
        [
          {
            id: uuidv4(),
            body: JSON.stringify(complaintData)
          }
        ])
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  validateAgainstSchema,
  sendToQueue,
};
