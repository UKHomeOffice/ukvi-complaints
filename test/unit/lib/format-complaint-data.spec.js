// 'use-strict';

// const formatComplaintData = require('../../../apps/ukvi-complaints/lib/format-complaint-data');

// describe('#formatComplaintData', () => {

//   describe('reason - immigration-application', () => {
    const values = {
      'csrf-secret': 'pTuaXZfpEH4Hi2GwjNTEH4ej',
      errors: null,
      reason: 'immigration-application',
      steps:
      ['/reason',
        '/immigration-application',
        '/application-technical',
        '/application-ref-numbers',
        '/acting-as-agent',
        '/who-representing',
        '/agent-name',
        '/agent-contact-details',
        '/agent-representative-name',
        '/agent-representative-dob',
        '/agent-representative-nationality',
        '/complaint-details'],
      'immigration-application': 'technical-issues',
      'who-representing': 'legal-rep',
      'agent-name': 'mm',
      'agent-email': 'test@test.com',
      'agent-phone': '12435667889',
      'agent-representative-name': 'pp',
      'agent-representative-dob': '1980-02-02',
      'agent-representative-nationality': 'Ukraine',
      'complaint-details': 'test',
      'where-applied-from': 'inside-uk',
      'reference-numbers': 'gwf',
      'gwf-reference': 'GWF012345678',
      'ho-reference': '',
      'ihs-reference': '',
      'uan-reference': '',
      'acting-as-agent': 'yes',
    };

const v2 = { 'csrf-secret': 'HLBHrUQJ8I5Yn9beesrFGTrP',
  errors: null,
  reason: 'immigration-application',
  steps:
   ['/reason',
     '/immigration-application',
     '/application-technical',
     '/application-ref-numbers',
     '/acting-as-agent',
     '/applicant-name',
     '/applicant-dob',
     '/applicant-nationality',
     '/applicant-contact-details',
     '/complaint-details'],
  'immigration-application': 'technical-issues',
  'where-applied-from': 'inside-uk',
  'reference-numbers': 'none',
  'gwf-reference': '',
  'ho-reference': '',
  'ihs-reference': '',
  'uan-reference': '',
  'acting-as-agent': 'no',
  'applicant-name': 'JJ',
  'applicant-dob': '1980-02-02',
  'applicant-nationality': 'Ukraine',
  'applicant-email': 'test@test.com',
  'applicant-phone': '1234567890',
  'complaint-details': 'test' };


//     describe('by agent on behalf of applicant', () => {

//       it('should return an object containing agent details with phone number', () => {

//       });

//       // No phone number

//     });

//     describe('by applicant', () => {

//       // phone number

//       // no phone number

//     });

//     describe('')


//   });

// })


// ;
