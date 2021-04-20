'use strict';
const complaint = require('./complaint');

const formatPreviousComplaint = (values) => {
  switch (values['existing-complaint']) {
    case 'no':
      const complaintReason = 'complaint-reason-previous';
      return {
        previousComplaintType: complaint.getFormattedEnum(values[complaintReason], complaintReason),
      };
    case 'yes':
      return {
        complaintReferenceNumber: values['complaint-reference-number'],
      };
    default:
      throw new Error('invalid "existing-complaint" value');
  }
};

const getExistingComplaint = (values) => {
  let data = complaint.getComplaint(values);
  data.complaint.complaintType = 'EXISTING';
  data.complaint.complaintDetails.previousComplaint = formatPreviousComplaint(values);
  return data;
};


module.exports = getExistingComplaint;
