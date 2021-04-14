'use strict';
const Complaint = require('./complaint');

class DecisionComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'IMMIGRATION_DECISION';
    this.complaintAttributes.complaint.complaintDetails.decisionOutcome = this.getFormattedEnum(
      this.values['decision-outcome']
    );
  }
}

module.exports = DecisionComplaint;
