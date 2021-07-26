'use strict';
const complaint = require('./complaint');

const getMakingAppointmentComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'MAKING_APPOINTMENT';
  const immigrationAppointment = 'immigration-appointment';
  data.complaint.complaintDetails.problemExperienced = complaint.getFormattedEnum(
    values[immigrationAppointment], immigrationAppointment
  );
  return data;
};

module.exports = getMakingAppointmentComplaint;
