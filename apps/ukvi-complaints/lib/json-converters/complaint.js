'use strict';
const moment = require('moment');
const enums = require('../enums');

class Complaint {
  constructor(values) {
    this.values = values;
    this.complaintAttributes = {
      creationDate: moment().format('YYYY-MM-DD'),
      complaint: {
        reporterDetails: this.createReporterDetails(),
        complaintDetails: {
          complaintText: values['complaint-details']
        }
      }
    };

    if (this.values['reference-numbers'] && this.values['reference-numbers'] !== 'none') {
      this.complaintAttributes.complaint.reference = this.createReference();
    }

    if (this.values['where-applied-from']) {
      this.complaintAttributes.complaint.complaintDetails.applicationLocation = this.getFormattedEnum(
        this.values['where-applied-from']
      );
    }
  }

  getFormattedEnum(complaintField) {
    if (enums[complaintField]) {
      return enums[complaintField];
    }

    const invalidField = Object.keys(this.values).find(key => this.values[key] === complaintField);
    throw new Error(`invalid "${invalidField}" value`);
  }

  createReporterDetails() {
    switch (this.values['acting-as-agent']) {
      case 'yes':
        const applicantWithAgentDetails = {
          applicantType: 'AGENT',
          applicantDetails: {
            applicantName: this.values['agent-representative-name'],
            applicantNationality: this.values['agent-representative-nationality'],
            applicantDob: this.values['agent-representative-dob']
          },
          agentDetails: {
            agentName: this.values['agent-name'],
            agentType: this.getFormattedEnum(this.values['who-representing']),
            agentEmail: this.values['agent-email'],
          }
        };

        if (this.values['agent-phone']) {
          applicantWithAgentDetails.agentDetails.agentPhone = this.values['agent-phone'];
        }
        return applicantWithAgentDetails;
      case 'no':
        const applicantDetails = {
          applicantType: 'APPLICANT',
          applicantName: this.values['applicant-name'],
          applicantNationality: this.values['applicant-nationality'],
          applicantDob: this.values['applicant-dob'],
          applicantEmail: this.values['applicant-email'],
        };
        if (this.values['applicant-phone']) {
          applicantDetails.applicantPhone = this.values['applicant-phone'];
        }
        return applicantDetails;
      default:
        throw new Error('invalid "acting-as-agent" value');
    }
  }

  createReference() {
    const referenceDetails = {
      reference: this.values[`${this.values['reference-numbers']}-reference`]
    };

    switch (this.values['reference-numbers']) {
      case 'gwf':
        referenceDetails.referenceType = 'GWF_REF';
        return referenceDetails;
      case 'ho':
        referenceDetails.referenceType = 'HO_REF';
        return referenceDetails;
      case 'ihs':
        referenceDetails.referenceType = 'IHS_REF';
        return referenceDetails;
      case 'uan':
        referenceDetails.referenceType = 'UAN_REF';
        return referenceDetails;
      default:
        throw new Error('invalid "reference-numbers" value');
    }
  }
}

module.exports = Complaint;
