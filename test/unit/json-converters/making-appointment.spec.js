'use strict';
const complaintDetailsBase = require('../test-data/complaint-base');
const getMakingAppointmentComplaint = require(
  '../../../lib/json-converters/making-appointment');

describe('getMakingAppointmentComplaint', () => {
  describe('problemExperienced', () => {
    it('returns "LACK_AVAILABILITY" if "lack-availability" immigration-appointment value passed in', () => {
      const values = Object.assign({
        'immigration-appointment': 'lack-availability'
      }, complaintDetailsBase);

      const makingAppointmentComplaint = getMakingAppointmentComplaint(values);
      expect(
        makingAppointmentComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('LACK_AVAILABILITY');
    });

    it('returns "CHANGE_APPOINTMENT" if "change-appointment" immigration-appointment value passed in', () => {
      const values = Object.assign({
        'immigration-appointment': 'change-appointment'
      }, complaintDetailsBase);

      const makingAppointmentComplaint = getMakingAppointmentComplaint(values);
      expect(
        makingAppointmentComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('CHANGE_APPOINTMENT');
    });

    it('returns "TECHNICAL_APPOINTMENTS" if "technical-appointments" immigration-appointment value passed in', () => {
      const values = Object.assign({
        'immigration-appointment': 'technical-appointments'
      }, complaintDetailsBase);

      const makingAppointmentComplaint = getMakingAppointmentComplaint(values);
      expect(
        makingAppointmentComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('TECHNICAL_APPOINTMENTS');
    });

    it('returns "QUESTIONS_APPOINTMENTS" if "questions-appointments" immigration-appointment value passed in', () => {
      const values = Object.assign({
        'immigration-appointment': 'questions-appointments'
      }, complaintDetailsBase);

      const makingAppointmentComplaint = getMakingAppointmentComplaint(values);
      expect(
        makingAppointmentComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('QUESTIONS_APPOINTMENTS');
    });

    it('returns "COMPLAIN_APPOINTMENTS" if "complain-appointments" immigration-appointment value passed in', () => {
      const values = Object.assign({
        'immigration-appointment': 'complain-appointments'
      }, complaintDetailsBase);

      const makingAppointmentComplaint = getMakingAppointmentComplaint(values);
      expect(
        makingAppointmentComplaint.complaint.complaintDetails.problemExperienced
      ).to.eql('COMPLAIN_APPOINTMENTS');
    });

    it('throws an error if invalid immigration-appointment is passed', () => {
      const values = Object.assign({
        'immigration-appointment': 'invalid'
      }, complaintDetailsBase);

      expect(() => getMakingAppointmentComplaint(values)).to.throw('invalid "immigration-appointment" value');
    });
  });
});
