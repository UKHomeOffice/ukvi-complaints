'use strict';
const { expect } = require('chai');
const Behaviour = require('../../../apps/ukvi-complaints/behaviours/add-to-casework');

describe('Add to casework system', () => {
  let req;
  let res;
  let AddToCasework;
  let testInstance;

  class Base {
    process() {}
  }

  describe('#process', () => {

    beforeEach(() => {
      this.clock = date => sinon.useFakeTimers(new Date(date));
      this.clock('2021-01-01');

      req = {
        sessionModel: {
          attributes: {
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
            'acting-as-agent': 'yes' },
        }
      };

      AddToCasework = Behaviour(Base);
      testInstance = new AddToCasework();
    });

    it('It should add the complaintData to request', () => {
      testInstance.process(req, res, () => {});
      console.log(req);
      console.log(req.form.complaintData);
      // expect(req.form.complaintData).to.deep.equal({
      //   creationDate
      // });
    });


  });


});
