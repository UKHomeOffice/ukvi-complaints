/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getExistingComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/existing');

describe('getExistingComplaint', () => {
  describe('previousComplaint', () => {
    it('returns existingComplaintreference number if "yes" existing-existingComplaintvalue passed in', () => {
      const refNumber = '23456789o0p9';
      const values = Object.assign({
        'existing-complaint': 'yes',
        'complaint-reference-number': refNumber
      }, complaintDetailsBase);

      const existingComplaint = getExistingComplaint(values);
      expect(
        existingComplaint.complaint.complaintDetails.previousComplaint.complaintReferenceNumber
        ).to.eql(refNumber);
    });

      describe('previousComplaintType', () => {
        it('returns "SUBMITTING_APPLICATION" if "immigration-application" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'immigration-application'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('SUBMITTING_APPLICATION');
        });

        it('returns "MAKING_APPOINTMENT" if "immigration-appointment" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'immigration-appointment'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('MAKING_APPOINTMENT');
        });

        it('returns "DELAYS" if "delays" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'delays'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('DELAYS');
        });

        it('returns "BIOMETRIC_RESIDENCE_PERMIT" if "biometric-residence-permit" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'biometric-residence-permit'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('BIOMETRIC_RESIDENCE_PERMIT');
        });

        it('returns "IMMIGRATION_DECISION" if "immigration-decision" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'immigration-decision'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('IMMIGRATION_DECISION');
        });

        it('returns "IMMIGRATION_STATUS_CHANGE" if "immigration-status-change" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'immigration-status-change'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('IMMIGRATION_STATUS_CHANGE');
        });

        it('returns "REFUND" if "refund" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'refund'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('REFUND');
        });

        it('returns "POOR_INFORMATION_OR_STAFF_BEHAVIOUR" if "staff-behaviour" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'staff-behaviour'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('POOR_INFORMATION_OR_STAFF_BEHAVIOUR');
        });

        it('returns "SOMETHING_ELSE" if "other-complaint" complaint-reason-previous value passed in', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'other-complaint'
          }, complaintDetailsBase);

          const existingComplaint = getExistingComplaint(values);
          expect(
            existingComplaint.complaint.complaintDetails.previousComplaint.previousComplaintType
            ).to.eql('SOMETHING_ELSE');
        });

        it('throws an error if invalid complaint-reason-previous value is passed', () => {
          const values = Object.assign({
            'existing-complaint': 'no',
            'complaint-reason-previous': 'invalid'
          }, complaintDetailsBase);

          expect(() => getExistingComplaint(values)).to.throw('invalid "complaint-reason-previous" value');
        });

      });

    it('throws an error if invalid existing-existingComplaintvalue is passed', () => {
      const values = Object.assign({
        'existing-complaint': 'invalid'
      }, complaintDetailsBase);

      expect(() => getExistingComplaint(values)).to.throw('invalid "existing-complaint" value');
    });


  });


});
