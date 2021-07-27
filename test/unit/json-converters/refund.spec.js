'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getRefundComplaint = require('../../../lib/json-converters/refund');

describe('getRefundComplaint', () => {
  describe('refundRequested', () => {
    it('returns "NO" if "no" refund value passed in', () => {
      const values = Object.assign({
        'refund': 'no',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundRequested
      ).to.eql('NO');
    });

    it('returns "YES" if "yes" refund value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundRequested
      ).to.eql('YES');
    });

    it('returns "NOT_YET" if "not-yet" refund value passed in', () => {
      const values = Object.assign({
        'refund': 'not-yet',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundRequested
      ).to.eql('NOT_YET');
    });

    it('throws an error if invalid refund value is passed', () => {
      const values = Object.assign({
        'refund': 'invalid'
      }, complaintDetailsBase);

      expect(() => getRefundComplaint(values)).to.throw('invalid "refund" value');
    });

  });

  describe('refundType', () => {
    it('returns "STANDARD" if "standard" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'standard',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('STANDARD');
    });

    it('returns "PRIORITY" if "priority" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'priority',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('PRIORITY');
    });

    it('returns "SUPER_PRIORITY" if "super-priority" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'super-priority',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('SUPER_PRIORITY');
    });

    it('returns "PREMIUM" if "premium" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'premium',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('PREMIUM');
    });

    it('returns "IHS" if "ihs" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'ihs',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('IHS');
    });

    it('returns "EU_SETTLEMENT" if "eu-settlement" refund-type value passed in', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'eu-settlement',
      }, complaintDetailsBase);

      const refundComplaint = getRefundComplaint(values);
      expect(
        refundComplaint.complaint.complaintDetails.refundType
      ).to.eql('EU_SETTLEMENT');
    });

    it('throws an error if invalid refund-type is passed', () => {
      const values = Object.assign({
        'refund': 'yes',
        'refund-type': 'invalid'
      }, complaintDetailsBase);

      expect(() => getRefundComplaint(values)).to.throw('invalid "refund-type" value');
    });
  });

});
