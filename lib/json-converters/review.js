'use strict';
const complaint = require('./complaint');

const formatPreviousComplaint = values => {
  switch (values['complaint-review']) {
    case 'no':
      const complaintReason = 'complaint-reason-previous';
      return {
        previousComplaintType: complaint.getFormattedEnum(values[complaintReason], complaintReason)
      };
    case 'yes':
      return {
        complaintReferenceNumber: values['complaint-reference-number']
      };
    default:
      throw new Error('invalid "complaint-review" value');
  }
};

const getComplaintReview = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'EXISTING';
  data.complaint.complaintDetails.previousComplaint = formatPreviousComplaint(values);
  return data;
};


module.exports = getComplaintReview;
