'use strict';
const complaint = require('./complaint');

const getDelaysComplaint = (values) => {
  let data = complaint.getComplaint(values);
  data.complaint.complaintType = 'DELAYS';
  const delayType = 'delay-type';
  data.complaint.complaintDetails.delayedWaitingFor = complaint.getFormattedEnum(
    values[delayType], delayType
  );

  const returnOfDocuments = 'return-of-documents';
  if (values[returnOfDocuments]) {
    data.complaint.complaintDetails.documentReturnRequest = complaint.getFormattedEnum(
      values[returnOfDocuments], returnOfDocuments
    );
  }
  return data;
};

module.exports = getDelaysComplaint;
