'use strict';
const moment = require('moment');

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
      this.complaintAttributes.complaint.complaintDetails.applicationLocation = this.applicationLocationEnum();
    }
  }

  agentEnum() {
    switch (this.values['who-representing']) {
      case 'relative':
        return 'RELATIVE';
      case 'legal-rep':
        return 'LEGAL_REP';
      case 'sponsor':
        return 'SPONSOR';
      case 'support-org':
        return 'SUPPORT_ORG';
    }
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
            agentType: this.agentEnum(),
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
        return '';
    }
  }

  createReference() {
    switch (this.values['reference-numbers']) {
      case 'gwf':
        return {
          referenceType: 'GWF_REF',
          reference: this.values['gwf-reference']
        };
      case 'ho':
        return {
          referenceType: 'HO_REF',
          reference: this.values['ho-reference']
        };
      case 'ihs':
        return {
          referenceType: 'IHS_REF',
          reference: this.values['ihs-reference']
        };
      case 'uan':
        return {
          referenceType: 'UAN_REF',
          reference: this.values['uan-reference']
        };
      default:
        // ! If not provided one what to return?
        break;
    }
  }

  applicationLocationEnum() {
    switch (this.values['where-applied-from']) {
      case 'inside-uk':
        return 'INSIDE_UK';
      case 'outside-uk':
        return 'OUTSIDE_UK';
    }
  }
}

module.exports = Complaint;
