'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getSubmittingApplicationComplaint = require(
  '../../../lib/json-converters/submitting-application'
);

describe('SubmittingApplicationComplaint', () => {
  describe('problemExperienced', () => {
    it('returns "TECHNICAL_ISSUES" if "technical-issues" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'technical-issues',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = getSubmittingApplicationComplaint(values);

      expect(
        submittingApplicationComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('TECHNICAL_ISSUES');
    });

    it('returns "GUIDANCE" if "guidance" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'guidance',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = getSubmittingApplicationComplaint(values);
      expect(
        submittingApplicationComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('GUIDANCE');
    });

    it('returns "SOMETHING_ELSE" if "complain" immigration-application value passed in', () => {
      const values = Object.assign({
        'immigration-application': 'complain',
      }, complaintDetailsBase);

      const submittingApplicationComplaint = getSubmittingApplicationComplaint(values);
      expect(
        submittingApplicationComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('SOMETHING_ELSE');
    });

    it('throws an error if invalid immigration-application is passed', () => {
      const values = Object.assign({
        'immigration-application': 'invalid',
      }, complaintDetailsBase);

      expect(() => getSubmittingApplicationComplaint(values)).to.throw('invalid "immigration-application" value');
    });
  });

});
