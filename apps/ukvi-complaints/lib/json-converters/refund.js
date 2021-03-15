'use strict';
const Complaint = require('./complaint');

class RefundComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'REFUND';
    this.complaintAttributes.complaint.complaintDetails.refundRequested = this.refundRequestedEnum();

    if (this.values['refund-type']) {
      this.complaintAttributes.complaint.complaintDetails.refundType = this.refundTypeEnum(
        this.values['refund-type']
      );
    }

    if (this.values['refund-type-automatic']) {
      this.complaintAttributes.complaint.complaintDetails.refundType = this.refundTypeEnum(
        this.values['refund-type-automatic']
      );
    }

  }

  refundRequestedEnum() {
    switch (this.values.refund) {
      case 'no':
        return 'NO';
      case 'not-yet':
        return 'NOT_YET';
      case 'yes':
        return 'YES';
      default:
        throw new Error('invalid "refund" value');
    }
  }

  refundTypeEnum(refundType) {
    switch (refundType) {
      case 'standard':
        return 'STANDARD';
      case 'priority':
        return 'PRIORITY';
      case 'super-priority':
        return 'SUPER_PRIORITY';
      case 'premium':
        return 'PREMIUM';
      case 'ihs':
        return 'IHS';
      case 'eu-settlement':
        return 'EU_SETTLEMENT';
      default:
        throw new Error('invalid "refund-type" value')
    }
  }

}

module.exports = RefundComplaint;
