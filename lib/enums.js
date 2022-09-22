'use strict';
const enums = {
  // complaint base
  relative: 'RELATIVE',
  'legal-rep': 'LEGAL_REP',
  sponsor: 'SPONSOR',
  'support-org': 'SUPPORT_ORG',
  'inside-uk': 'INSIDE_UK',
  'outside-uk': 'OUTSIDE_UK',
  // brp
  'card-incorrect': 'CARD_INCORRECT',
  'card-not-arrived': 'CARD_NOT_ARRIVED',
  'complain-brp': 'COMPLAIN_BRP',
  // decision
  negative: 'NEGATIVE',
  positive: 'POSITIVE',
  // existing
  'immigration-application': 'SUBMITTING_APPLICATION',
  'immigration-appointment': 'MAKING_APPOINTMENT',
  delays: 'DELAYS',
  'biometric-residence-permit': 'BIOMETRIC_RESIDENCE_PERMIT',
  'immigration-decision': 'IMMIGRATION_DECISION',
  'immigration-status-change': 'IMMIGRATION_STATUS_CHANGE',
  refund: 'REFUND',
  'staff-behaviour': 'POOR_INFORMATION_OR_STAFF_BEHAVIOUR',
  'other-complaint': 'SOMETHING_ELSE',
  // making appointment
  'lack-availability': 'LACK_AVAILABILITY',
  'change-appointment': 'CHANGE_APPOINTMENT',
  'technical-appointments': 'TECHNICAL_APPOINTMENTS',
  'questions-appointments': 'QUESTIONS_APPOINTMENTS',
  'complain-appointments': 'COMPLAIN_APPOINTMENTS',
  // submitting application
  'technical-issues': 'TECHNICAL_ISSUES',
  guidance: 'GUIDANCE',
  complain: 'SOMETHING_ELSE',
  // staff behaviour
  'face-to-face': 'FACE_TO_FACE',
  'on-phone': 'PHONE',
  'in-letter': 'LETTER_OR_EMAIL',
  vac: 'VAC',
  ssc: 'SSC',
  ukvcas: 'UKVCAS',
  // refund
  'not-yet': 'NOT_YET',
  yes: 'YES',
  standard: 'STANDARD',
  priority: 'PRIORITY',
  'super-priority': 'SUPER_PRIORITY',
  premium: 'PREMIUM',
  ihs: 'IHS',
  'eu-settlement': 'EU_SETTLEMENT',
  'more-than': 'MORE_THAN_SIX_WEEKS',
  'lesss-than': 'LESS_THAN_SIX_WEEKS',
  // delay
  'application-delay': 'APPLICATION_DELAY',
  'return-of-documents': 'RETURN_OF_DOCUMENTS',
  'yes-other': 'YES_OTHER',
  'yes-docs-service': 'YES_DOCS_SERVICE',
  // delay and refund
  no: 'NO'
};

module.exports = enums;
