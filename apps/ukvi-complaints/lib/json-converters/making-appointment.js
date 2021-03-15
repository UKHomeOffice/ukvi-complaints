'use strict';
const Complaint = require('./complaint');

class MakingAppointmentComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'MAKING_APPOINTMENT';
    this.complaintAttributes.complaint.complaintDetails.problemExperienced = this.problemExperiencedEnum();
  }

  problemExperiencedEnum() {
    switch (this.values['immigration-appointment']) {
      case 'lack-availability':
        return 'LACK_AVAILABILITY';
      case 'change-appointment':
        return 'CHANGE_APPOINTMENT';
      case 'technical-appointments':
        return 'TECHNICAL_APPOINTMENTS';
      case 'questions-appointments':
        return 'QUESTIONS_APPOINTMENTS';
      case 'complain-appointments':
        return 'COMPLAIN_APPOINTMENTS';
      default:
        throw new Error('invalid "immigration-appointment" value');

    }
  }
}

module.exports = MakingAppointmentComplaint;
