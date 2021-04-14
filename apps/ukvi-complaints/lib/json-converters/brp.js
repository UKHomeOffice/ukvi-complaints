'use strict';
const Complaint = require('./complaint');

class BrpComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'BIOMETRIC_RESIDENCE_PERMIT';
    this.complaintAttributes.complaint.complaintDetails.problemExperienced = this.getFormattedEnum(
      this.values['biometric-residence-permit']
    );
  }
}

module.exports = BrpComplaint;
