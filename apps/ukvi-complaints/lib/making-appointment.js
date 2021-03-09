'use strict';
const Complaint = require('./complaint');

class MakingAppointmentComplaint extends Complaint {
  constructor(values) {
    super(values);
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

  formatValues() {
    const complaintDetails = {
      creationDate: this.creationDate,
      complaint: {
        complaintType: 'MAKING_APPOINTMENT',
        complaintDetails: {
          complaintText: this.values['complaint-details'],
          problemExperienced: this.problemExperiencedEnum(),
        },
        reporterDetails: this.createReporterDetails(),
      }
    };

    if (this.values['where-applied-from']) {
      complaintDetails.complaint.complaintDetails.applicationLocation = this.applicationLocationEnum();
    }

    if (this.values['reference-numbers'] !== 'none') {
      complaintDetails.complaint.reference = this.createReference();
    }

    return complaintDetails;
  }
}

module.exports = MakingAppointmentComplaint;
