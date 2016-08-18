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
  }
};
