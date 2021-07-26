'use strict';
const complaint = require('./complaint');

const getDecisionComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'IMMIGRATION_DECISION';
  const enumReference = 'decision-outcome';
  data.complaint.complaintDetails.decisionOutcome = complaint.getFormattedEnum(
    values[enumReference], enumReference
  );
  return data;
};

module.exports = getDecisionComplaint;
