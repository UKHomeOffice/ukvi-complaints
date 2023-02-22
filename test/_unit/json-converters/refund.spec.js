'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getRefundComplaint = require('../../../lib/json-converters/refund');

describe('getRefundComplaint', () => {
  describe('refundRequested', () => {
    it('returns "NO" if "no" refund value passed in', () => {
      const values = Object.assign({
        refund: 'no'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundRequested
      ).to.eql('NO');
    });

    it('returns "YES" if "yes" refund value passed in', () => {
      const values = Object.assign({
        refund: 'yes'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundRequested
      ).to.eql('YES');
    });

    it('throws an error if invalid refund value is passed', () => {
      const values = Object.assign({
        refund: 'invalid'
      }, complaintDetailsBase);

      expect(() => getRefundComplaint(values)).to.throw('invalid "refund" value');
    });
  });

  describe('refundWhen', () => {
    it('returns "MORE_THAN_SIX_WEEKS" if "more-than" refund-when value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-when': 'more-than'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundWhen
      ).to.eql('MORE_THAN_SIX_WEEKS');
    });

    it('returns "LESS_THAN_SIX_WEEKS" if "less-than" refund-when value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-when': 'less-than'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundWhen
      ).to.eql('LESS_THAN_SIX_WEEKS');
    });
  });

  describe('refundType', () => {
    it('returns "STANDARD" if "standard" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'standard'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('STANDARD');
    });

    it('returns "PRIORITY" if "priority" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'priority'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('PRIORITY');
    });

    it('returns "SUPER_PRIORITY" if "super-priority" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'super-priority'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('SUPER_PRIORITY');
    });

    it('returns "PREMIUM" if "premium" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'premium'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('PREMIUM');
    });

    it('returns "IHS" if "ihs" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'ihs'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('IHS');
    });

    it('returns "EU_SETTLEMENT" if "eu-settlement" refund-type value passed in', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'eu-settlement'
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('EU_SETTLEMENT');
    });

    it('throws an error if invalid refund-type is passed', () => {
      const values = Object.assign({
        refund: 'yes',
        'refund-type': 'invalid'
      }, complaintDetailsBase);

      expect(() => getRefundComplaint(values)).to.throw('invalid "refund-type" value');
    });
  });
});
