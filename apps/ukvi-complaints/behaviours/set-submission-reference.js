'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    const submissionReference = req.sessionModel.get('submission-reference') || uuidv4();
    req.sessionModel.set('submission-reference', submissionReference);
    req.log('info', `Submission Reference: ${submissionReference} for application submission`);
    return super.getValues(req, res, next);
  }
};
