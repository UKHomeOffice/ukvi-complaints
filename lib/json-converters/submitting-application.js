'use strict';
const complaint = require('./complaint');

const getSubmittingApplicationComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'SUBMITTING_APPLICATION';
  const enumReference = 'immigration-application';
  data.complaint.complaintDetails.problemExperienced = complaint.getFormattedEnum(
    values[enumReference], enumReference
  );
  return data;
};

module.exports = getSubmittingApplicationComplaint;
