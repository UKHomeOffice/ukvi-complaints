'use strict';
const complaint = require('./complaint');

const formatExperience = values => {
  const staffBehaviour = 'staff-behaviour';
  const experience = {
    experienceType: complaint.getFormattedEnum(values[staffBehaviour], staffBehaviour)
  };

  switch (values[staffBehaviour]) {
    case 'face-to-face':
      const whichCentre = 'which-centre';
      experience.location = {
        centreType: complaint.getFormattedEnum(values[whichCentre], whichCentre),
        city: values[`${values[whichCentre]}-city`]
      };

      if (values[whichCentre] === 'vac') {
        experience.location.country = values['vac-country'];
      }
      return experience;

    case 'on-phone':
      experience.callDetails = {
        numberCalled: values['called-number'],
        date: values['called-date'],
        time: values['called-time'],
        calledFrom: values['called-from']
      };
      return experience;

    case 'in-letter':
      return experience;
    default:
      throw new Error('invalid "staff-behaviour" value');
  }
};

const getStaffBehaviourComplaint = values => {
  const data = complaint.getComplaint(values);
  data.complaint.complaintType = 'POOR_STAFF_BEHAVIOUR';
  data.complaint.complaintDetails.experience = formatExperience(values);
  return data;
};

module.exports = getStaffBehaviourComplaint;
