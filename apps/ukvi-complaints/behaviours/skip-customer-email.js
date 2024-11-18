'use strict';
const config = require('../../../config');
const customerEmailer = require('./customer-email')(config.email);
const caseworkerEmailer = require('./caseworker-email')(config.email);
const sendToSQS = require('./send-to-sqs');

module.exports = superclass => class extends superclass {
  // configure(req, res, next) {
  //   return super.configure(req, res, (err, values) => {
  //     console.log('behaviours', req.form.options.behaviours);
  //     if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
  //       console.log('no applicant email');
  //       req.form.options.behaviours.splice(3, 1);
  //       // return req.form.options.behaviours;
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     else {
  //       console.log(req.sessionModel.get('applicant-email'));
  //       console.log(req.sessionModel.get('agent-email'));
  //       console.log('there is an email');
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     return next(null, values);
  //   });
  // }
  configure(req, res, next) {
    console.log('behaviours', req.form);
    if (req.form.options.route === '/confirm') {
      if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
        console.log('route ', req.form.options.steps['/confirm'].behaviours);
        console.log('no applicant email');
        req.form.options.behaviours.push(require('hof').components.summary, sendToSQS, caseworkerEmailer, 'complete');
        req.form.options.steps['/confirm'].behaviours.push(require('hof').components.summary, sendToSQS, caseworkerEmailer, 'complete');
        console.log('no customer-email behaviour', req.form.options.behaviours);
      }
      else {
        console.log('applicant email ', req.sessionModel.get('applicant-email'));
        console.log('agent email ', req.sessionModel.get('agent-email'));
        console.log('there is an email');
        console.log('customer-email behaviour', req.form.options.behaviours);
        req.form.options.behaviours.push(require('hof').components.summary, sendToSQS, caseworkerEmailer, customerEmailer, 'complete');
        req.form.options.steps['/confirm'].push(require('hof').components.summary, sendToSQS, caseworkerEmailer, customerEmailer, 'complete');
      }
    }
    console.log('behaviour final ', req.form.options.behaviours);
    console.log('behaviour steps final ', req.form.options.steps);
    return super.configure(req, res, next);
  }
  // getValues(req, res, next) {
  //   return super.getValues(req, res, (err, values) => {
  //     if (!req.sessionModel.get('applicant-email') && !req.sessionModel.get('agent-email')) {
  //       console.log('no applicant email');
  //       req.form.options.behaviours.splice(3, 1);
  //       return req.form.options.behaviours;
  //       // console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     else {
  //       console.log(req.sessionModel.get('applicant-email'));
  //       console.log(req.sessionModel.get('agent-email'));
  //       console.log('there is an email');
  //       console.log('no customer-email behaviour', req.form.options.behaviours);
  //     }
  //     return next(null, values);
  //   });
  // }
};

