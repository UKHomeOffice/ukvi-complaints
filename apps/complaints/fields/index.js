'use strict';

module.exports = {
	'who-radio': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    options: [{
      value: 'applicant',
      label: 'I am the applicant'
    }, {
      value: 'representative',
      label: 'I represent the applicant'
    }]
  }
};

