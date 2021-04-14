'use strict';
const Complaint = require('./complaint');

class StaffBehaviourComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'POOR_STAFF_BEHAVIOUR';
    this.complaintAttributes.complaint.complaintDetails.experience = this.formatExperience();
  }

  formatExperience() {
    const experience = {
      experienceType: this.getFormattedEnum(this.values['staff-behaviour']),
    };

    switch (this.values['staff-behaviour']) {
      case 'face-to-face':
        experience.location = {
          centreType: this.getFormattedEnum(this.values['which-centre']),
          city: this.values[`${this.values['which-centre']}-city`]
        };

        if (this.values['which-centre'] === 'vac') {
          experience.location.country = this.values['vac-country'];
        }
        return experience;

      case 'on-phone':
        experience.callDetails = {
          numberCalled: this.values['called-number'],
          date: this.values['called-date'],
          time: this.values['called-time'],
          calledFrom: this.values['called-from']
        };
        return experience;

      case 'in-letter':
        return experience;
      default:
        throw new Error('invalid "staff-behaviour" value');
    }
  }
}

module.exports = StaffBehaviourComplaint;
