'use strict';

module.exports = {
	applicant: {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    options: [{
      value: 'true',
      label: 'fields.applicant.options.true.label'
    }, {
      value: 'false',
      label: 'fields.applicant.options.false.label'
    }]
  },
  'applicant-given-name': {
    mixin: 'input-text',
    validate: ['required']
  },
  'applicant-family-name': {
    mixin: 'input-text',
    validate: ['required']
  },
  'dob': {
  },
  'dob-day': {
    validate: ['required', 'numeric']
  },
  'dob-month': {
    validate: ['required', 'numeric']
  },
  'dob-year': {
    validate: ['required', 'numeric']
  },
  'complaint-type': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    options: [{
      value: 'previous',
      label: 'fields.complaint-type.options.previous'
    }, {
      value: 'staff',
      label: 'fields.complaint-type.options.staff'
    }, {
      value: 'appointment',
      label: 'fields.complaint-type.options.appointment'
    }, {
      value: 'refund',
      label: 'fields.complaint-type.options.refund'
    }, {
      value: 'quality',
      label: 'fields.complaint-type.options.quality'
    }, {
      value: 'something',
      label: 'fields.complaint-type.options.something'
    }]
  }
};
