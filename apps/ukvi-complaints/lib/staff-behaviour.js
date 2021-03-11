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
    }
  }

  faceToFace() {
    const experience = {
      experienceType: 'FACE_TO_FACE',
      location: {},
    };

    switch (this.values['which-centre']) {
      case 'vac':
        experience.location.country = this.values['vac-country'];
        experience.location.city = this.values['vac-city'];
        break;
      case 'ssc':
        experience.location.city = this.values['ssc-city'];
        break;
      case 'ukvcas':
        experience.location.city = this.values['ukvcas-city'];
        break;
    }

    return experience;
  }
}

module.exports = StaffBehaviourComplaint;
