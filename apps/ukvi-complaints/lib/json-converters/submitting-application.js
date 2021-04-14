'use strict';
const Complaint = require('./complaint');

class SubmittingApplicationComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'SUBMITTING_APPLICATION';
    this.complaintAttributes.complaint.complaintDetails.problemExperienced = this.getFormattedEnum(
      this.values['immigration-application']
    );
  }
}

module.exports = SubmittingApplicationComplaint;
