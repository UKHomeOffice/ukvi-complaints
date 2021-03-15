/* eslint-disable max-nested-callbacks */
'use strict';
const { expect } = require('chai');
const complaintDetailsBase = require('../test-data/complaint-base');
const StaffBehaviourComplaint = require('../../../../apps/ukvi-complaints/lib/json-converters/staff-behaviour');

describe('StaffBehaviourComplaint', () => {
  describe('experience', () => {

    it('throws an error if invalid staff-behaviour is passed', () => {
      const values = Object.assign({
        'staff-behaviour': 'invalid',
      }, complaintDetailsBase);

      expect(() => new StaffBehaviourComplaint(values)).to.throw('invalid "staff-behaviour" value');
    });

    describe('face-to-face', () => {

      describe('which-centre', () => {

        it('returns vac location information if "vac" which-centre value passed in', () => {
          const country = 'Ukraine';
          const city = 'Kiev';

          const values = Object.assign({
            'staff-behaviour': 'face-to-face',
            'which-centre': 'vac',
            'vac-country': country,
            'vac-city': city,
          }, complaintDetailsBase);

          const staffBehaviourComplaint = new StaffBehaviourComplaint(values);
          expect(
            staffBehaviourComplaint.complaintAttributes.complaint.complaintDetails.experience
            ).to.eql({
              experienceType: 'FACE_TO_FACE',
              location: {
                country,
                city,
                centreType: 'VAC'
              }
            });
        });

        it('returns ssc location information if "ssc" which-centre value passed in', () => {
          const city = 'Birmingham';

          const values = Object.assign({
            'staff-behaviour': 'face-to-face',
            'which-centre': 'ssc',
            'ssc-city': city,
          }, complaintDetailsBase);

          const staffBehaviourComplaint = new StaffBehaviourComplaint(values);
          expect(
            staffBehaviourComplaint.complaintAttributes.complaint.complaintDetails.experience
            ).to.eql({
              experienceType: 'FACE_TO_FACE',
              location: {
                city,
                centreType: 'SSC'
              }
            });
        });

        it('returns ukvcas location information if "ukvcas" which-centre value passed in', () => {
          const city = 'Birmingham';

          const values = Object.assign({
            'staff-behaviour': 'face-to-face',
            'which-centre': 'ukvcas',
            'ukvcas-city': city,
          }, complaintDetailsBase);

          const staffBehaviourComplaint = new StaffBehaviourComplaint(values);
          expect(
            staffBehaviourComplaint.complaintAttributes.complaint.complaintDetails.experience
            ).to.eql({
              experienceType: 'FACE_TO_FACE',
              location: {
                city,
                centreType: 'UKVCAS'
              }
            });
        });

        it('throws an error if invalid which-centre is passed', () => {
          const values = Object.assign({
            'staff-behaviour': 'face-to-face',
            'which-centre': 'invalid',
          }, complaintDetailsBase);

          expect(() => new StaffBehaviourComplaint(values)).to.throw('invalid "which-centre" value');
        });

      });

    });

    describe('on-phone', () => {
      it('returns callDetails information', () => {
        const phoneNumber = '23456789099';
        const date = 'June 12th 2020';
        const time = '10:30am';
        const calledFrom = '2345678908';

        const values = Object.assign({
          'staff-behaviour': 'on-phone',
          'called-number': phoneNumber,
          'called-date': date,
          'called-time': time,
          'called-from': calledFrom,
        }, complaintDetailsBase);

        const staffBehaviourComplaint = new StaffBehaviourComplaint(values);
        expect(
          staffBehaviourComplaint.complaintAttributes.complaint.complaintDetails.experience
          ).to.eql({
            experienceType: 'PHONE',
            callDetails: {
              numberCalled: phoneNumber,
              date,
              time,
              calledFrom: calledFrom
            }
          });
      });
    });

    describe('in-letter', () => {
      it('returns experienceType "LETTER_OR_EMAIL"', () => {
        const values = Object.assign({
          'staff-behaviour': 'in-letter',
        }, complaintDetailsBase);

        const staffBehaviourComplaint = new StaffBehaviourComplaint(values);
        expect(staffBehaviourComplaint.complaintAttributes.complaint.complaintDetails.experience.experienceType
          ).to.eql('LETTER_OR_EMAIL');
      });
    });

  });

});
