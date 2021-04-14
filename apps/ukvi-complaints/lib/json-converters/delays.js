'use strict';
const Complaint = require('./complaint');

class DelaysComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'DELAYS';
    this.complaintAttributes.complaint.complaintDetails.delayedWaitingFor = this.getFormattedEnum(
      this.values['delay-type']
    );
    if (this.values['return-of-documents']) {
      this.complaintAttributes.complaint.complaintDetails.documentReturnRequest = this.getFormattedEnum(
        this.values['return-of-documents']
      );
    }
  }
}

module.exports = DelaysComplaint;
