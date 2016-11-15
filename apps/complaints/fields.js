'use strict';

module.exports = {
	applicant: {
		mixin: 'radio-group',
		validate: 'required',
		className: ['form-group'],
		options: [{
			value: 'true',
			label: 'fields.applicant.options.true.label'
		}, {
			value: 'false',
			label: 'fields.applicant.options.false.label',
			toggle: 'accept-declaration',
			child: `<div id="accept-declaration-panel" class="reveal js-hidden">
								<div class="panel-indent">
									<p>{{#t}}fields.accept-declaration.p1{{/t}}</p>
									<p>{{#t}}fields.accept-declaration.p2{{/t}}</p>
									{{#checkbox}}accept-declaration{{/checkbox}}
								</div>
							</div>`
		}]
	},
	'accept-declaration': {
		validate: 'required',
		dependent: {
			field: 'applicant',
			value: 'false'
		}
	},
	'applicant-name': {
		mixin: 'input-text',
		validate: 'required'
	},
	'representative-name': {
		mixin: 'input-text',
		validate: 'required'
	},
	'dob': {
	},
	'dob-day': {
		validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
	},
	'dob-month': {
		validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
	},
	'dob-year': {
		validate: ['required', 'numeric'],
    includeInEmail: false,
    includeInSummary: false
	},
	'email-address': {
		mixin: 'input-text',
		validate: ['required', 'email']
	},
	'phone-number': {
		mixin: 'input-number',
		validate: 'numeric'
	},
	'complaint-type': {
		mixin: 'radio-group',
		validate: 'required',
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
	},
	'where': {
		mixin: 'radio-group',
		validate: 'required',
		className: ['form-group'],
		options: [{
			value: 'phone',
			label: 'fields.where.options.phone'
		}, {
			value: 'visa-application-centre',
			label: 'fields.where.options.visa-application-centre'
		}, {
			value: 'premium-service-centre',
			label: 'fields.where.options.premium-service-centre'
		}, {
			value: 'letter',
			label: 'fields.where.options.letter'
		}]
	},
  'has-complaint-reference': {
    mixin: 'radio-group',
    validate: 'required',
    className: ['form-group'],
    options: [{
      value: 'yes',
      label: 'fields.has-complaint-reference.options.yes',
      toggle: 'complaint-reference',
      child: 'input-text'
    }, {
      value: 'no',
      label: 'fields.has-complaint-reference.options.no'
    }]
  },
  'complaint-reference': {
    validate: 'required',
    dependent: {
      field: 'has-complaint-reference',
      value: 'yes'
    }
  },
  'complaint-details': {
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }],
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'complaint-phone-number': {
    mixin: 'input-number',
    validate: ['required', 'numeric']
  },
  'complaint-date': {
  },
  'complaint-date-day': {
    validate: 'numeric',
    includeInSummary: false
  },
  'complaint-date-month': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'complaint-date-year': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'complaint-time': {
    mixin: 'input-text',
    validate: 'required'
  },
  'phoned-from': {
    mixin: 'input-number',
    validate: ['required', 'numeric']
  },
  'has-reference': {
    mixin: 'radio-group',
    validate: 'required',
    className: ['form-group'],
    options: [{
      value: 'yes',
      label: 'fields.has-reference.options.yes'
    }, {
      value: 'no',
      label: 'fields.has-reference.options.no'
    }]
  },
  country: {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../assets/countries').allCountries),
    validate: 'required'
  },
  city: {
    mixin: 'input-text',
    validate: 'required'
  },
  'reference-numbers': {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [{
      value: 'gwf',
      toggle: 'gwf-reference',
      child: 'input-text'
    }, {
      value: 'ho',
      toggle: 'ho-reference',
      child: 'input-text'
    }, {
      value: 'ihs',
      toggle: 'ihs-reference',
      child: 'input-text'
    }]
  },
  'gwf-reference': {
    dependent: {
      field: 'reference-numbers',
      value: 'gwf'
    },
    validate: 'required'
  },
  'ho-reference': {
    dependent: {
      field: 'reference-numbers',
      value: 'ho'
    },
    validate: 'required'
  },
  'ihs-reference': {
    dependent: {
      field: 'reference-numbers',
      value: 'ihs'
    },
    validate: 'required'
  },
  'service-centre-city': {
    mixin: 'input-text',
    validate: 'required'
  }
};
