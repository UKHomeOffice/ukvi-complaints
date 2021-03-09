'use strict';
const Complaint = require('./complaint');

class DelaysComplaint extends Complaint {
  constructor(values) {
    super(values);
  }

  delayedWaitingForEnum() {
    switch (this.values['delay-type']) {
      case 'application-delay':
        return 'APPLICATION_DELAY';
      case 'return-of-documents':
        return 'RETURN_OF_DOCUMENTS';
    }
  }

  documentReturnRequestEnum() {
    switch (this.values['return-of-documents']) {
      case 'yes-other':
        return 'YES_OTHER';
      case 'yes-docs-service':
        return 'YES_DOCS_SERVICE';
      case 'no':
        return 'NO';
    }
  }

  formatValues() {
    const complaintDetails = {
      creationDate: this.creationDate,
      complaint: {
        complaintType: 'DELAYS',
        reporterDetails: this.createReporterDetails(),
        complaintDetails: {
          complaintText: this.values['complaint-details'],
          delayedWaitingFor: this.delayedWaitingForEnum()
        }
      },
    };

    if (this.values['return-of-documents']) {
      complaintDetails.complaint.complaintDetails.documentReturnRequest = this.documentReturnRequestEnum();
    }

    if (this.values['where-applied-from']) {
      complaintDetails.complaint.complaintDetails.applicationLocation = this.applicationLocationEnum();
    }

    if (this.values['reference-numbers'] !== 'none') {
      complaintDetails.complaint.reference = this.createReference();
    }

    return complaintDetails;
  }
}

module.exports = DelaysComplaint;
