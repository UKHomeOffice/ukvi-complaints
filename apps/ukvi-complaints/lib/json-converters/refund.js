'use strict';
const Complaint = require('./complaint');

class RefundComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'REFUND';
    this.complaintAttributes.complaint.complaintDetails.refundRequested = this.getFormattedEnum(
      this.values.refund
    );

    if (this.values['refund-type']) {
      this.complaintAttributes.complaint.complaintDetails.refundType = this.getFormattedEnum(
        this.values['refund-type']
      );
    }

    if (this.values['refund-type-automatic']) {
      this.complaintAttributes.complaint.complaintDetails.refundType = this.getFormattedEnum(
        this.values['refund-type-automatic']
      );
    }

  }

}

module.exports = RefundComplaint;
