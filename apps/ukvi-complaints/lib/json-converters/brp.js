'use strict';
const Complaint = require('./complaint');

class BrpComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'BIOMETRIC_RESIDENCE_PERMIT';
    this.complaintAttributes.complaint.complaintDetails.problemExperienced = this.problemExperiencedEnum();
  }

  problemExperiencedEnum() {
    switch (this.values['biometric-residence-permit']) {
      case 'card-incorrect':
        return 'CARD_INCORRECT';
      case 'card-not-arrived':
        return 'CARD_NOT_ARRIVED';
      case 'complain-brp':
        return 'COMPLAIN_BRP';
      default:
        throw new Error('invalid "biometric-residence-permit" value');
    }
  }
}

module.exports = BrpComplaint;