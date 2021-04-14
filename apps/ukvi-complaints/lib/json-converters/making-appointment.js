'use strict';
const Complaint = require('./complaint');

class MakingAppointmentComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'MAKING_APPOINTMENT';
    this.complaintAttributes.complaint.complaintDetails.problemExperienced = this.getFormattedEnum(
      this.values['immigration-appointment']
    );
  }
}

module.exports = MakingAppointmentComplaint;
