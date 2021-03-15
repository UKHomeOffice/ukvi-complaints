/* eslint-disable max-nested-callbacks */
'use strict';
// eslint-disable-next-line max-len
const complaintDetailsBase = require('../test-data/complaint-base');
const SubmittingApplicationComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/submitting-application');

describe('SubmittingApplicationComplaint', () => {
  describe('problemExperienced', () => {
    it('returns "TECHNICAL_ISSUES" if "technical-issues" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'technical-issues',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = new SubmittingApplicationComplaint(values);
      expect(
        submittingApplicationComplaint.complaintAttributes.complaint.complaintDetails.problemExperienced
        ).to.eql('TECHNICAL_ISSUES');
    });

    it('returns "GUIDANCE" if "guidance" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'guidance',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = new SubmittingApplicationComplaint(values);
      expect(
        submittingApplicationComplaint.complaintAttributes.complaint.complaintDetails.problemExperienced
        ).to.eql('GUIDANCE');
    });

    it('returns "SOMETHING_ELSE" if "complain" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'complain',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = new SubmittingApplicationComplaint(values);
      expect(
        submittingApplicationComplaint.complaintAttributes.complaint.complaintDetails.problemExperienced
        ).to.eql('SOMETHING_ELSE');
    });

    it('throws an error if invalid immigration-application is passed', () => {
      const values = Object.assign({
        'immigration-application': 'invalid',
      }, complaintDetailsBase);

      expect(() => new SubmittingApplicationComplaint(values)).to.throw('invalid "immigration-application" value');
    });
  });

});
