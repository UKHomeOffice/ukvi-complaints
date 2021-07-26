'use strict';
const complaint = require('./complaint');

const getSomethingElseComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'SOMETHING_ELSE';
  return data;
};

module.exports = getSomethingElseComplaint;
