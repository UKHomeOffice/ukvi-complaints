'use strict';
const Complaint = require('./complaint');

class DecisionComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'IMMIGRATION_DECISION';
    this.complaintAttributes.complaint.complaintDetails.decisionOutcome = this.decisionOutcomeEnum();
  }

  decisionOutcomeEnum() {
    switch (this.values['decision-outcome']) {
      case 'negative':
        return 'NEGATIVE';
      case 'positive':
        return 'POSITIVE';
    }
  }
}

module.exports = DecisionComplaint;
