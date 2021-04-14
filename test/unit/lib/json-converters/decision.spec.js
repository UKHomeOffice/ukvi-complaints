/* eslint-disable max-nested-callbacks */
'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const DecisionComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/decision');

describe('DecisionComplaint', () => {
  describe('decisionOutcome', () => {
    it('returns "NEGATIVE" if "negative" decision-outcome value passed in', () => {
      const values = Object.assign({
        'decision-outcome': 'negative'
      }, complaintDetailsBase);

      const decisionComplaint = new DecisionComplaint(values);
      expect(decisionComplaint.complaintAttributes.complaint.complaintDetails.decisionOutcome).to.eql('NEGATIVE');
    });

    it('returns "POSITIVE" if "positive" decision-outcome value passed in', () => {
      const values = Object.assign({
        'decision-outcome': 'positive'
      }, complaintDetailsBase);

      const decisionComplaint = new DecisionComplaint(values);
      expect(decisionComplaint.complaintAttributes.complaint.complaintDetails.decisionOutcome).to.eql('POSITIVE');
    });

    it('throws an error if invalid decision-outcome is passed', () => {
      const values = Object.assign({
        reason: 'immigration-decision',
        'decision-outcome': 'invalid'
      }, complaintDetailsBase);

      expect(() => new DecisionComplaint(values)).to.throw('invalid "decision-outcome" value');
    });

  });
});
