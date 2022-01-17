'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getComplaintReview = require('../../../lib/json-converters/review');

describe('getComplaintReview', () => {
  describe('previousComplaint', () => {
    it('returns existing complaint reference number if "yes" complaint-review value passed in', () => {
      const refNumber = '23456789o0p9';
      const values = {
        'complaint-review': 'yes',
        'complaint-reference-number': refNumber,
        'complaint-details': 'test'
      };

      const complaintReview = getComplaintReview(values);
      expect(
        complaintReview.complaint.complaintDetails.previousComplaint.complaintReferenceNumber
      ).to.eql(refNumber);
    });

    describe('previousComplaintType', () => {
      it('returns "SUBMITTING_APPLICATION" if "immigration-application" value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'immigration-application'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('SUBMITTING_APPLICATION');
      });

      it('returns "MAKING_APPOINTMENT" if "immigration-appointment" complaint-reason-previous value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'immigration-appointment'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('MAKING_APPOINTMENT');
      });

      it('returns "DELAYS" if "delays" complaint-reason-previous value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'delays'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('DELAYS');
      });

      it('returns "BIOMETRIC_RESIDENCE_PERMIT" if "biometric-residence-permit" value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'biometric-residence-permit'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('BIOMETRIC_RESIDENCE_PERMIT');
      });

      it('returns "IMMIGRATION_DECISION" if "immigration-decision" complaint-reason-previous value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'immigration-decision'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('IMMIGRATION_DECISION');
      });

      it('returns "IMMIGRATION_STATUS_CHANGE" if "immigration-status-change" value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'immigration-status-change'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('IMMIGRATION_STATUS_CHANGE');
      });

      it('returns "REFUND" if "refund" complaint-reason-previous value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'refund'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('REFUND');
      });

      it('returns "POOR_INFORMATION_OR_STAFF_BEHAVIOUR" if "staff-behaviour" value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'staff-behaviour'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('POOR_INFORMATION_OR_STAFF_BEHAVIOUR');
      });

      it('returns "SOMETHING_ELSE" if "other-complaint" complaint-reason-previous value passed in', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'other-complaint'
        }, complaintDetailsBase);

        const complaintReview = getComplaintReview(values);
        expect(
          complaintReview.complaint.complaintDetails.previousComplaint.previousComplaintType
        ).to.eql('SOMETHING_ELSE');
      });

      it('throws an error if invalid complaint-reason-previous value is passed', () => {
        const values = Object.assign({
          'complaint-review': 'no',
          'complaint-reason-previous': 'invalid'
        }, complaintDetailsBase);

        expect(() => getComplaintReview(values)).to.throw('invalid "complaint-reason-previous" value');
      });
    });

    it('throws an error if invalid existing-complaint value is passed', () => {
      const values = Object.assign({
        'complaint-review': 'invalid'
      }, complaintDetailsBase);

      expect(() => getComplaintReview(values)).to.throw('invalid "complaint-review" value');
    });
  });
});
