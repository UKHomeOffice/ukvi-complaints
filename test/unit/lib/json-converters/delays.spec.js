/* eslint-disable max-nested-callbacks */
'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const DelaysComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/delays');

describe('DelaysComplaint', () => {
  describe('delayedWaitingFor', () => {
    it('returns "APPLICATION_DELAY" if "application-delay" delay-type value passed in', () => {
      const values = Object.assign({
        'delay-type': 'application-delay'
      }, complaintDetailsBase);

      const delaysComplaint = new DelaysComplaint(values);
      expect(
        delaysComplaint.complaintAttributes.complaint.complaintDetails.delayedWaitingFor
        ).to.eql('APPLICATION_DELAY');
    });

    it('returns "RETURN_OF_DOCUMENTS" if "return-of-documents" delay-type value passed in', () => {
      const values = Object.assign({
        'delay-type': 'return-of-documents'
      }, complaintDetailsBase);

      const delaysComplaint = new DelaysComplaint(values);
      expect(
        delaysComplaint.complaintAttributes.complaint.complaintDetails.delayedWaitingFor
        ).to.eql('RETURN_OF_DOCUMENTS');
    });

    it('throws an error if invalid delay-type is passed', () => {
      const values = Object.assign({
        'delay-type': 'invalid'
      }, complaintDetailsBase);

      expect(() => new DelaysComplaint(values)).to.throw('invalid "delay-type" value');
    });

  });

  describe('documentReturnRequest', () => {
    it('returns "YES_OTHER" if "yes-other" return-of-documents value passed in', () => {
      const values = Object.assign({
        'delay-type': 'return-of-documents',
        'return-of-documents': 'yes-other'
      }, complaintDetailsBase);

      const delaysComplaint = new DelaysComplaint(values);
      expect(
        delaysComplaint.complaintAttributes.complaint.complaintDetails.documentReturnRequest
        ).to.eql('YES_OTHER');
    });

    it('returns "YES_DOCS_SERVICE" if "yes-docs-service" return-of-documents value passed in', () => {
      const values = Object.assign({
        'delay-type': 'return-of-documents',
        'return-of-documents': 'yes-docs-service'
      }, complaintDetailsBase);

      const delaysComplaint = new DelaysComplaint(values);
      expect(
        delaysComplaint.complaintAttributes.complaint.complaintDetails.documentReturnRequest
        ).to.eql('YES_DOCS_SERVICE');
    });

    it('returns "NO" if "yes-docs-service" return-of-documents value passed in', () => {
      const values = Object.assign({
        'delay-type': 'return-of-documents',
        'return-of-documents': 'no'
      }, complaintDetailsBase);

      const delaysComplaint = new DelaysComplaint(values);
      expect(
        delaysComplaint.complaintAttributes.complaint.complaintDetails.documentReturnRequest
        ).to.eql('NO');
    });

    it('throws an error if invalid return-of-documents is passed', () => {
      const values = Object.assign({
        'delay-type': 'return-of-documents',
        'return-of-documents': 'invalid'
      }, complaintDetailsBase);

      expect(() => new DelaysComplaint(values)).to.throw('invalid "return-of-documents" value');
    });
  });

});
