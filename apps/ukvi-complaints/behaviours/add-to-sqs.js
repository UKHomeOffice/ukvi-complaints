/* eslint-disable default-case */
'use strict';
const Validator = require('jsonschema').Validator;
const { Producer } = require('sqs-producer');
const decsSchema = require('../schema/decs.json');
const SubmittingApplicationComplaint = require('../lib/submitting-application');
const MakingAppointmentComplaint = require('../lib/making-appointment');
const DelaysComplaint = require('../lib/delays');
const BrpComplaint = require('../lib/brp');
const DecisionComplaint = require('../lib/decision');
const RefundComplaint = require('../lib/refund');
const InformationIssueComplaint = require('../lib/information-issue');
const StaffBehaviourComplaint = require('../lib/staff-behaviour');
const ExistingComplaint = require('../lib/existing');
const SomethingElseComplaint = require('../lib/something-else');

module.exports = config => {

  return superclass => class SQSIntegration extends superclass {

    formatData(values) {
      switch (values.reason) {
        case 'immigration-application':
          const submittingApplication = new SubmittingApplicationComplaint(values);
          return submittingApplication.complaintAttributes;

        case 'immigration-appointment':
          const makingApplication = new MakingAppointmentComplaint(values);
          return makingApplication.complaintAttributes;

        case 'delays':
          const delays = new DelaysComplaint(values);
          return delays.complaintAttributes;

        case 'biometric-residence-permit':
          const brp = new BrpComplaint(values);
          return brp.complaintAttributes;

        case 'immigration-decision':
          const decision = new DecisionComplaint(values);
          return decision.complaintAttributes;

        case 'refund':
          const refund = new RefundComplaint(values);
          return refund.complaintAttributes;

        case 'staff-behaviour':
          if (values['poor-info-or-behaviour'] === 'poor-information') {
            const informationIssue = new InformationIssueComplaint(values);
            return informationIssue.complaintAttributes;
          }

          const staffBehaviour = new StaffBehaviourComplaint(values);
          return staffBehaviour.complaintAttributes;

        case 'existing-complaint':
          const existing = new ExistingComplaint(values);
          return existing.complaintAttributes;

        case 'other-complaint':
          const somethingElse = new SomethingElseComplaint(values);
          return somethingElse.complaintAttributes;
      }
    }

    process(req, res, next) {
      super.saveValues(req, res, (err) => {
        try {
          const complaintData = this.formatData(req.sessionModel.toJSON());
          req.form.complaintData = complaintData;
          return super.process(req, res, next);
        } catch {
          next(err);
        }
      });
    }

    validate(req, res, next) {
      try {
        const validator = new Validator();
        const valid = validator.validate(req.form.complaintData, decsSchema);

        if (valid.errors) {
          throw new Error(valid.errors);
        }

        return super.validate(req, res, next);
      } catch (err) {
        return next(err);
      }
    }

    saveValues(req, res, next) {
      super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }

        if (!config.writeToSQS) {
          next();
        } else {
          const producer = Producer.create({
            queueUrl: config.aws.sqsUrl,
            region: config.aws.region,
            // accessKeyId: 'yourAccessKey',
            // secretAccessKey: 'yourSecret'
          });

          producer.send([{
            // ! id?
            body: JSON.stringify(req.form.complaintData),
          }], error => {
            next(error);
          })
          
        }
      })
    };
  };
};
