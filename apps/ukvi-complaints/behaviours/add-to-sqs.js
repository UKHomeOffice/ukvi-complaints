'use strict';
const { Producer } = require('sqs-producer');

// ! All caps are enums that match up to values returned on session model
      // ! To enum converters required
      // ! Some sections present in every complaint
      // ! Common include reference, reporterDetails

module.exports = config => {

  return superclass => class SQSIntegration extends superclass {


    agentEnum(whoRepresenting) {
      switch (whoRepresenting) {
        case 'relative':
          return 'RELATIVE';
        case 'legal-rep':
          return 'LEGAL_REP';
        case 'sponsor':
          return 'SPONSOR';
        case 'support-org':
          return 'SUPPORT_ORG';
        default:
          // ! What as default
          return '';
      }
    }

    createReporterDetails(values) {
      switch (values['acting-as-agent']) {
        case 'yes':
          const applicantWithAgentDetails = {
            applicantType: 'AGENT',
            applicantDetails: {
              applicantName: values['agent-representative-name'],
              applicantNationality: values['agent-representative-nationality'],
              applicantDob: values['agent-representative-dob']
            },
            agentDetails: {
              agentName: values['agent-name'],
              agentType: SQSIntegration.agentEnum(values['who-representing']),
              agentEmail: values['agent-email'],
            }
          };

          if (values['agent-phone']) {
            applicantWithAgentDetails.agentPhone = values['agent-phone'];
          }
          return applicantWithAgentDetails;
        case 'no':
          const applicantDetails = {
            applicantType: 'APPLICANT',
            applicantName: values['applicant-name'],
            applicantNationality: values['applicant-nationality'],
            applicantDob: values['applicant-dob'],
            applicantEmail: values['applicant-email'],
          };
          if (values['agent-phone']) {
            applicantDetails.applicantPhone = values['applicant-phone'];
          }
          return applicantDetails;
        default:
          return '';
      }


    }

    createReference(values) {
      switch (values['reference-numbers']) {
        case 'gwf':
          return {
            referenceType: 'GWF_REF',
            reference: values['gwf-reference']
          };
        case 'ho':
          return {
            referenceType: 'HO_REF',
            reference: values['ho-reference']
          };
        case 'ihs':
          return {
            referenceType: 'IHS_REF',
            reference: values['ihs-reference']
          };
        case 'uan':
          return {
            referenceType: 'UAN_REF',
            reference: values['uan-reference']
          };
        default:
          // ! If not provided one what to return?
          break;
      }
    }

    createSubmittingApplicationComplaintJSON(values) {

      //! Add the other ENUM Conversions

      const submittingApplicationComplaint = {
        complaintType: 'SUBMITTING_APPLICATION',
        complaintDetails: {
          complaintText: values['complaint-details'],
          problemExperienced: 'TECHNICAL_ISSUES',
          applicationLocation: 'INSIDE_UK'
        },
        reporterDetails: SQSIntegration.createReporterDetails(values),
      };

      if (values['reference-numbers'] !== 'none') {
        submittingApplicationComplaint.reference = SQSIntegration.createReference(values);
      }

      return submittingApplicationComplaint;
    }

    formatData(values) {


      // todo format based on schema
      return {
        id: '123565',
        body: 'test',
      };
    }

    saveValues(req, res, next) {

      super.saveValues(req, res, err => {

        if (err) {
          return next(err);
        }

        console.log(req.sessionModel.toJSON());

        const complaintData = {
          id: '123565',
          body: 'test',
        };
        // const complaintData = SQSIntegration.formatData(req.sessionModel.toJSON());

        const producer = Producer.create({
          queueUrl: config.aws.sqsUrl,
          region: config.aws.region,
          // accessKeyId: 'yourAccessKey',
          // secretAccessKey: 'yourSecret'
        });

        producer.send([
          complaintData
        ]).then(resp => {
          console.log(resp);
        });

        return next();
      });
    }


  };
};
