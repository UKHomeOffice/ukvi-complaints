'use strict';
const Complaint = require('./complaint');

class MakingAppointmentComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintDetails.complaint.complaintType = 'MAKING_APPOINTMENT';
    this.complaintDetails.complaint.complaintDetails.problemExperienced = this.problemExperiencedEnum();
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
        return 'QUESTION_APPOINTMENTS';
      case 'complain-appointments':
        return 'COMPLAIN_APPOINTMENTS';

    }
  }
}

module.exports = MakingAppointmentComplaint;
