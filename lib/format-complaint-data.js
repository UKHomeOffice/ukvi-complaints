'use strict';

const getSubmittingApplicationComplaint = require('./json-converters/submitting-application');
const getMakingAppointmentComplaint = require('./json-converters/making-appointment');
const getDelaysComplaint = require('./json-converters/delays');
const getBrpComplaint = require('./json-converters/brp');
const getDecisionComplaint = require('./json-converters/decision');
const getRefundComplaint = require('./json-converters/refund');
const getInformationIssueComplaint = require('./json-converters/information-issue');
const getStaffBehaviourComplaint = require('./json-converters/staff-behaviour');
const getExistingComplaint = require('./json-converters/existing');
const getComplaintReview = require('./json-converters/review');
const getSomethingElseComplaint = require('./json-converters/something-else');

// eslint-disable-next-line complexity
const formatComplaintData = values => {
  switch (values.reason) {
    case 'immigration-application':
      return getSubmittingApplicationComplaint(values);

    case 'immigration-appointment':
      return getMakingAppointmentComplaint(values);

    case 'delays':
      return getDelaysComplaint(values);

    case 'biometric-residence-permit':
      return getBrpComplaint(values);

    case 'immigration-decision':
      return getDecisionComplaint(values);

    case 'refund':
      return getRefundComplaint(values);

    case 'staff-behaviour':
      if (values['poor-info-or-behaviour'] === 'poor-information') {
        return getInformationIssueComplaint(values);
      }

      if (values['poor-info-or-behaviour'] === 'staff-behaviour') {
        return getStaffBehaviourComplaint(values);
      }

      throw new Error('Invalid poor-info-or-behaviour value');

    case 'existing-complaint':
      return getExistingComplaint(values);

    case 'complaint-review':
      return getComplaintReview(values);

    case 'other-complaint':
      return getSomethingElseComplaint(values);

    default:
      throw new Error('Complaint reason not recognized');
  }
};

module.exports = formatComplaintData;
