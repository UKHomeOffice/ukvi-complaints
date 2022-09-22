'use strict';
const complaint = require('./complaint');

const getRefundComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'REFUND';
  const refund = 'refund';
  data.complaint.complaintDetails.refundRequested = complaint.getFormattedEnum(
    values[refund], refund
  );

  const refundType = 'refund-type';
  if (values[refundType]) {
    data.complaint.complaintDetails.refundType = complaint.getFormattedEnum(
      values[refundType], refundType
    );
  }

  const refundTypeAutomatic = 'refund-type-automatic';
  if (values[refundTypeAutomatic]) {
    data.complaint.complaintDetails.refundType = complaint.getFormattedEnum(
      values[refundTypeAutomatic], refundTypeAutomatic
    );
  }

  const refundWhen = 'refund-when';
  if (values[refundWhen]) {
    data.complaint.complaintDetails.refundWhen= complaint.getFormattedEnum(
      values[refundWhen], refundWhen
    );
  }

  return data;
};

module.exports = getRefundComplaint;
