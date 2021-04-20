'use strict';
const complaint = require('./complaint');

const getRefundComplaint = (values) => {
  let data = complaint.getComplaint(values);
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
  return data;
};

module.exports = getRefundComplaint;
