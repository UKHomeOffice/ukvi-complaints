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
          previousComplaintType: this.previousComplaintTypeEnum(),
        };
      case 'yes':
        return {
          complaintReferenceNumber: this.values['complaint-reference-number'],
        };
    }
  }


  previousComplaintTypeEnum() {
    switch (this.values['complaint-reason-previous']) {
      case 'immigration-application':
        return 'SUBMITTING_APPLICATION';
      case 'immigration-appointment':
        return 'MAKING_APPOINTMENT';
      case 'delays':
        return 'DELAYS';
      case 'biometric-residence-permit':
        return 'BIOMETRIC_RESIDENCE_PERMIT';
      case 'immigration-decision':
        return 'IMMIGRATION_DECISION';
      case 'immigration-status-change':
        return 'IMMIGRATION_STATUS_CHANGE';
      case 'refund':
        return 'REFUND';
      case 'staff-behaviour':
        return 'POOR_INFORMATION_OR_STAFF_BEHAVIOUR';
      case 'other-complaint':
        return 'SOMETHING_ELSE';
    }
  }
}

module.exports = ExistingComplaint;
