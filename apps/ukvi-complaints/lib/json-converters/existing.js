'use strict';
const Complaint = require('./complaint');

class ExistingComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'EXISTING';
    this.complaintAttributes.complaint.complaintDetails.previousComplaint = this.formatPreviousComplaint();
  }

  formatPreviousComplaint() {
    switch (this.values['existing-complaint']) {
      case 'no':
        return {
          previousComplaintType: this.getFormattedEnum(this.values['complaint-reason-previous']),
        };
      case 'yes':
        return {
          complaintReferenceNumber: this.values['complaint-reference-number'],
        };
      default:
        throw new Error('invalid "existing-complaint" value');
    }
  }

}

module.exports = ExistingComplaint;
