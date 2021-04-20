'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getBrpComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/brp');

describe('getBrpComplaint', () => {
  describe('problemExperienced', () => {
    it('returns "CARD_INCORRECT" if "card-incorrect" value passed in', () => {
      const values = Object.assign({
        'biometric-residence-permit': 'card-incorrect'
      }, complaintDetailsBase);

      const brpComplaint = getBrpComplaint(values);
      expect(brpComplaint.complaint.complaintDetails.problemExperienced).to.eql('CARD_INCORRECT');
    });

    it('returns "CARD_NOT_ARRIVED" if "card-not-arrived" value passed in', () => {
      const values = Object.assign({
        'biometric-residence-permit': 'card-not-arrived'
      }, complaintDetailsBase);

      const brpComplaint = getBrpComplaint(values);
      expect(brpComplaint.complaint.complaintDetails.problemExperienced).to.eql('CARD_NOT_ARRIVED');
    });

    it('returns "COMPLAIN_BRP" if "complain-brp" value passed in', () => {
      const values = Object.assign({
        'biometric-residence-permit': 'complain-brp'
      }, complaintDetailsBase);

      const brpComplaint = getBrpComplaint(values);
      expect(brpComplaint.complaint.complaintDetails.problemExperienced).to.eql('COMPLAIN_BRP');
    });

    it('throws an error if invalid biometric-residence-permit is passed', () => {
      const values = Object.assign({
        'biometric-residence-permit': 'invalid',
        reason: 'biometric-residence-permit'
      }, complaintDetailsBase);

      expect(() => getBrpComplaint(values)).to.throw('invalid "biometric-residence-permit" value');
    });
  });
});
