'use strict';

module.exports = {
	'who': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    options: [{
      value: 'applicant',
      label: 'fields.who.options.applicant.label'
    }, {
      value: 'representative',
      label: 'fields.who.options.representative.label'
    }]
  }
};

