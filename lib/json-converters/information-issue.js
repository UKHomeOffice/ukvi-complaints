'use strict';
const complaint = require('./complaint');

const getInformationIssueComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'POOR_INFORMATION';
  return data;
};

module.exports = getInformationIssueComplaint;
