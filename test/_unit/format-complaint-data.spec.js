'use strict';

const complaintDetailsBase = require('./test-data/complaint-base');
const formatComplaintData = require('../../lib/format-complaint-data');

describe('formatComplaintData', () => {
  describe('reason', () => {
    describe('immigration-application', () => {
      it('returns complaint data with type "SUBMITTING_APPLICATION"', () => {
        const values = Object.assign({
          reason: 'immigration-application',
          'immigration-application': 'technical-issues'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('SUBMITTING_APPLICATION');
      });
    });

    describe('immigration-appointment', () => {
      it('returns complaint data with type "MAKING_APPOINTMENT"', () => {
        const values = Object.assign({
          reason: 'immigration-appointment',
          'immigration-appointment': 'lack-availability'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('MAKING_APPOINTMENT');
      });
    });

    describe('delays', () => {
      it('returns complaint data with type "WAITING_FOR_DECISION_OR_DOCUMENT"', () => {
        const values = Object.assign({
          reason: 'delays',
          'delay-type': 'application-delay',
          'return-of-documents': 'yes-other'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('WAITING_FOR_DECISION_OR_DOCUMENT');
      });
    });

    describe('biometric-residence-permit', () => {
      it('returns complaint data with type "BIOMETRIC_RESIDENCE_PERMIT"', () => {
        const values = Object.assign({
          reason: 'biometric-residence-permit',
          'biometric-residence-permit': 'card-incorrect'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('BIOMETRIC_RESIDENCE_PERMIT');
      });
    });

    describe('immigration-decision', () => {
      it('returns complaint data with type "IMMIGRATION_DECISION"', () => {
        const values = Object.assign({
          reason: 'immigration-decision',
          'decision-outcome': 'negative'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('IMMIGRATION_DECISION');
      });
    });

    describe('refund', () => {
      it('returns complaint data with type "REFUND"', () => {
        const values = Object.assign({
          reason: 'refund',
          refund: 'no'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('REFUND');
      });
    });

    describe('staff-behaviour', () => {
      describe('staff-behaviour', () => {
        it('returns complaint data with type "POOR_STAFF_BEHAVIOUR"', () => {
          const values = Object.assign({
            reason: 'staff-behaviour',
            'staff-behaviour': 'in-letter'
          }, complaintDetailsBase);
          const complaintData = formatComplaintData(values);
          expect(complaintData.complaint.complaintType).to.eql('POOR_STAFF_BEHAVIOUR');
        });
      });
    });

    describe('existing-complaint', () => {
      it('returns complaint data with type "EXISTING"', () => {
        const values = Object.assign({
          reason: 'existing-complaint',
          'existing-complaint': 'yes',
          'complaint-reference-number': 'ghjkld'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('EXISTING');
      });
    });

    describe('other-complaint', () => {
      it('returns complaint data with type "SOMETHING_ELSE"', () => {
        const values = Object.assign({
          reason: 'other-complaint'
        }, complaintDetailsBase);
        const complaintData = formatComplaintData(values);
        expect(complaintData.complaint.complaintType).to.eql('SOMETHING_ELSE');
      });
    });

    describe('invalid reason', () => {
      it('throws an error if an invalid reason is provided', () => {
        const values = Object.assign({
          reason: 'invalid'
        }, complaintDetailsBase);
        expect(() => formatComplaintData(values)).to.throw('Complaint reason not recognized');
      });
    });
  });
});
