'use strict';
const Complaint = require('./complaint');

class StaffBehaviourComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'POOR_STAFF_BEHAVIOUR';
    this.complaintAttributes.complaint.complaintDetails.experience = this.formatExperience();
  }

  formatExperience() {
    switch (this.values['staff-behaviour']) {
      case 'face-to-face':
        return this.faceToFace();
      case 'on-phone':
        return this.onPhone();
      case 'in-letter':
        return this.inLetter();
    }
  }

  faceToFace() {
    const experience = {
      experienceType: 'FACE_TO_FACE',
    };

    switch (this.values['which-centre']) {
      case 'vac':
        experience.location = {
          country: this.values['vac-country'],
          city: this.values['vac-city'],
          centreType: 'VAC'
        };
        return experience;
      case 'ssc':
        experience.location = {
          city: this.values['ssc-city'],
          centreType: 'SSC'
        };
        return experience;
      case 'ukvcas':
        experience.location = {
          city: this.values['ukvcas-city'],
          centreType: 'UKVCAS'
        };
        return experience;
    }
  }

  onPhone() {
    return {
      experienceType: 'PHONE',
      callDetails: {
        numberCalled: this.values['called-number'],
        date: this.values['called-date'],
        time: this.values['called-time'],
        calledFrom: this.values['called-from']
      }
    };
  }

  inLetter() {
    return {
      experienceType: 'LETTER_OR_EMAIL',
    };
  }
}

module.exports = StaffBehaviourComplaint;
