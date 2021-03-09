'use strict';
const Complaint = require('./complaint');

class SubmittingApplicationComplaint extends Complaint {
  constructor(values) {
    super(values);
  }

  problemExperiencedEnum() {
    switch (this.values['immigration-application']) {
      case 'technical-issues':
        return 'TECHNICAL_ISSUES';
      case 'guidance':
        return 'GUIDANCE';
      case 'complain':
        return 'SOMETHING_ELSE';
    }
  }

  formatValues() {
    const complaintDetails = {
      creationDate: this.creationDate,
      complaint: {
        complaintType: 'SUBMITTING_APPLICATION',
        complaintDetails: {
          complaintText: this.values['complaint-details'],
          problemExperienced: this.problemExperiencedEnum(),
        },
        reporterDetails: this.createReporterDetails(),
      }
    };

    if (this.values['where-applied-from']) {
      complaintDetails.complaint.complaintDetails.applicationLocation = this.applicationLocationEnum();
    }

    if (this.values['reference-numbers'] !== 'none') {
      complaintDetails.complaint.reference = this.createReference();
    }

    return complaintDetails;
  }

}


module.exports = SubmittingApplicationComplaint;
