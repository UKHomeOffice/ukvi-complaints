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
		validate: ['required'],
		display: false
		// dependent: {
		// 	field: 'applicant',
		// 	value: 'false'
		// }
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
