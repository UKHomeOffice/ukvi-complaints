'use strict';
const Complaint = require('./complaint');

class InformationIssueComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'POOR_INFORMATION';
  }
}

module.exports = InformationIssueComplaint;
