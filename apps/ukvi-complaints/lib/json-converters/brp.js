'use strict';

const complaint = require('./complaint');

const getBrpComplaint = (values) => {
  let data = complaint.getComplaint(values);
  data.complaint.complaintType = 'BIOMETRIC_RESIDENCE_PERMIT';
  const enumReference = 'biometric-residence-permit';
  data.complaint.complaintDetails.problemExperienced = complaint.getFormattedEnum(
    values[enumReference], enumReference
  );
  return data;
};

module.exports = getBrpComplaint;
