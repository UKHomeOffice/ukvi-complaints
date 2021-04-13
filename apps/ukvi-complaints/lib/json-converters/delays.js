'use strict';
const Complaint = require('./complaint');

class DelaysComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'DELAYS';
    this.complaintAttributes.complaint.complaintDetails.delayedWaitingFor = this.delayedWaitingForEnum();
    if (this.values['return-of-documents']) {
      this.complaintAttributes.complaint.complaintDetails.documentReturnRequest = this.documentReturnRequestEnum();
    }
  }

  delayedWaitingForEnum() {
    switch (this.values['delay-type']) {
      case 'application-delay':
        return 'APPLICATION_DELAY';
      case 'return-of-documents':
        return 'RETURN_OF_DOCUMENTS';
      default:
        throw new Error('invalid "delay-type" value');
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
      default:
        throw new Error('invalid "return-of-documents" value');

    }
  }

}

module.exports = DelaysComplaint;
