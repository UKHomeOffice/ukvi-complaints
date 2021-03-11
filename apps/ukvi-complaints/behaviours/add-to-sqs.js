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


    // process - call formatData

    // validate - check data against schema

    // saveValue - send to SQS queue


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
          // todo staff behaviour face to face schema not working
          const staffBehaviour = new StaffBehaviourComplaint(values);
          return staffBehaviour.complaintAttributes;

        case 'existing-complaint':
          const existing = new ExistingComplaint(values);
          return existing.complaintAttributes;

        case 'other-complaint':
          const somethingElse = new SomethingElseComplaint(values);
          return somethingElse.complaintAttributes;

        default:
          return {
            test: 'test'
          };
      }
    }

    saveValues(req, res, next) {

        console.log(req.sessionModel.toJSON());

        const complaintData = this.formatData(req.sessionModel.toJSON());

        console.log(complaintData);
        console.log('>>>>>>>>>>>>>>>>>');
        console.log(complaintData.complaint.complaintDetails);

        const validator = new Validator();
        const valid = validator.validate(complaintData, decsSchema);

        console.log(valid.errors);

        const producer = Producer.create({
          queueUrl: config.aws.sqsUrl,
          region: config.aws.region,
          // accessKeyId: 'yourAccessKey',
          // secretAccessKey: 'yourSecret'
        });

        // producer.send([
        //   complaintData
        // ]).then(resp => {
        //   console.log(resp);
        // });

        return next();

    }


  };
};
