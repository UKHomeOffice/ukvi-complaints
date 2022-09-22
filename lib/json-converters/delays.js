'use strict';
const complaint = require('./complaint');

const getDelaysComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'WAITING_FOR_DECISION_OR_DOCUMENT';
  const delayType = 'delay-type';
  data.complaint.complaintDetails.delayedWaitingFor = complaint.getFormattedEnum(
    values[delayType], delayType
  );

  data.complaint.complaintDetails.applicationSubmittedWhen = values['when-applied'];

  const returnOfDocuments = 'return-of-documents';
  if (values[returnOfDocuments]) {
    data.complaint.complaintDetails.documentReturnRequest = complaint.getFormattedEnum(
      values[returnOfDocuments], returnOfDocuments
    );
  }
  return data;
};

module.exports = getDelaysComplaint;
