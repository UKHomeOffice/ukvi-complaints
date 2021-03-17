/* eslint-disable max-nested-callbacks */
'use strict';
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('Complaint', () => {
  let complaint;
  let Complaint;
  const creationDate = '2021-01-20';
  const applicantTypeApplicant = 'APPLICANT';
  const testApplicantName = 'test-name';
  const testApplicantDob = '1980-02-02';
  const testApplicantNationality = 'Ukraine';
  const testApplicantEmail = 'test@test.com';
  const testApplicantPhone = 1234567890;
  const testComplaintDetails = 'test details';
  const testGwfRef = 'GWF012345678';
  const testHoRef = 'HO3456789';
  const testIhsRef = 'IHS4567890';
  const testUanRef = 'UAN4567890';

  let values;
  const applicantTestValues = {
    'applicant-name': testApplicantName,
    'applicant-dob': testApplicantDob,
    'applicant-nationality': testApplicantNationality,
    'applicant-email': testApplicantEmail,
    'complaint-details': testComplaintDetails,
    'acting-as-agent': 'no',
  };

  const applicantTypeAgent = 'AGENT';
  const testAgentName = 'test-agent-name';
  const testAgentEmail = 'agent@test.com';
  const testAgentPhone = 2345678900;

  const agentTestValues = {
    'agent-name': testAgentName,
    'agent-email': testAgentEmail,
    'agent-representative-name': testApplicantName,
    'agent-representative-dob': testApplicantDob,
    'agent-representative-nationality': testApplicantNationality,
    'acting-as-agent': 'yes',
  };

  // ! TODO do when dodgy data comes in
  // ! Do with errors

  beforeEach(() => {

    const momentStub = sinon.stub().returns({
      format: () => (creationDate)
    });

    Complaint = proxyquire('../../../../apps/ukvi-complaints/lib/json-converters/complaint', {
      'moment': momentStub
    });
  });


  it('Should have property complaintAttributes which is an object', () => {
    values = applicantTestValues;
    complaint = new Complaint(values);
    expect(complaint.complaintAttributes).to.be.an('object');
  });

  describe('complaintAttributes', () => {

    it('Should have creationDate set', () => {
      values = applicantTestValues;
      complaint = new Complaint(values);
      expect(complaint.complaintAttributes.creationDate).to.eql(creationDate);
    });


    describe('reporterDetails', () => {

      describe('applicant', () => {

        beforeEach(() => {
          values = applicantTestValues;
        });

        it('Should return applicant details without phone number if not included', () => {
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeApplicant,
            applicantName: testApplicantName,
            applicantNationality: testApplicantNationality,
            applicantDob: testApplicantDob,
            applicantEmail: testApplicantEmail,
          });
        });

        it('Should return applicant details with phone number if included', () => {
          values['applicant-phone'] = testApplicantPhone;
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeApplicant,
            applicantName: testApplicantName,
            applicantNationality: testApplicantNationality,
            applicantDob: testApplicantDob,
            applicantEmail: testApplicantEmail,
            applicantPhone: testApplicantPhone,
          });
        });
      });

      describe('agent', () => {

        beforeEach(() => {
          values = agentTestValues;
        });

        it('it should return agent and applicant details with agentType RELATIVE', () => {
          values['who-representing'] = 'relative';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeAgent,
            applicantDetails: {
              applicantName: testApplicantName,
              applicantNationality: testApplicantNationality,
              applicantDob: testApplicantDob,
            },
            agentDetails: {
              agentName: testAgentName,
              agentType: 'RELATIVE',
              agentEmail: testAgentEmail
            }
          });
        });

        it('it should return agent and applicant details with agentType LEGAL_REP', () => {
          values['who-representing'] = 'legal-rep';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeAgent,
            applicantDetails: {
              applicantName: testApplicantName,
              applicantNationality: testApplicantNationality,
              applicantDob: testApplicantDob,
            },
            agentDetails: {
              agentName: testAgentName,
              agentType: 'LEGAL_REP',
              agentEmail: testAgentEmail
            }
          });
        });

        it('it should return agent and applicant details with agentType SPONSOR', () => {
          values['who-representing'] = 'sponsor';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeAgent,
            applicantDetails: {
              applicantName: testApplicantName,
              applicantNationality: testApplicantNationality,
              applicantDob: testApplicantDob,
            },
            agentDetails: {
              agentName: testAgentName,
              agentType: 'SPONSOR',
              agentEmail: testAgentEmail
            }
          });
        });

        it('it should return agent and applicant details with agentType SUPPORT_ORG', () => {
          values['who-representing'] = 'support-org';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeAgent,
            applicantDetails: {
              applicantName: testApplicantName,
              applicantNationality: testApplicantNationality,
              applicantDob: testApplicantDob,
            },
            agentDetails: {
              agentName: testAgentName,
              agentType: 'SUPPORT_ORG',
              agentEmail: testAgentEmail
            }
          });
        });

        it('Should return agent details with phone number if included', () => {
          values['agent-phone'] = testAgentPhone;
          values['who-representing'] = 'relative';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.reporterDetails).to.eql({
            applicantType: applicantTypeAgent,
            applicantDetails: {
              applicantName: testApplicantName,
              applicantNationality: testApplicantNationality,
              applicantDob: testApplicantDob,
            },
            agentDetails: {
              agentName: testAgentName,
              agentType: 'RELATIVE',
              agentEmail: testAgentEmail,
              agentPhone: testAgentPhone,
            }
          });
        });

        it('should throw error if incorrect who-representing type specified', () => {
          values['who-representing'] = 'error-agent';
          complaint = new Complaint(values);
          expect(complaint).to.throw();
        });

      });

    });

    describe('reference', () => {
      beforeEach(() => {
        values = applicantTestValues;
      });

      it('Does not include a reference if reference-number is not present', () => {
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint).to.not.have.all.keys('reference');
      });

      it('Does not include a reference if reference-numbers is specified as "none"', () => {
        values['reference-numbers'] = 'none';
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint).to.not.have.all.keys('reference');
      });

      it('If "gwf" reference, reference number will be set on GWF_REF', () => {
        values['reference-numbers'] = 'gwf';
        values['gwf-reference'] = testGwfRef;
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint.reference).to.eql({
          referenceType: 'GWF_REF',
          reference: testGwfRef
        });
      });

      it('If "ho" reference, reference number will be set on HO_REF', () => {
        values['reference-numbers'] = 'ho';
        values['ho-reference'] = testHoRef;
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint.reference).to.eql({
          referenceType: 'HO_REF',
          reference: testHoRef
        });
      });

      it('If "ihs" reference, reference number will be set on IHS_REF', () => {
        values['reference-numbers'] = 'ihs';
        values['ihs-reference'] = testIhsRef;
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint.reference).to.eql({
          referenceType: 'IHS_REF',
          reference: testIhsRef
        });
      });

      it('If "uan" reference, reference number will be set on UAN_REF', () => {
        values['reference-numbers'] = 'uan';
        values['uan-reference'] = testUanRef;
        complaint = new Complaint(values);
        expect(complaint.complaintAttributes.complaint.reference).to.eql({
          referenceType: 'UAN_REF',
          reference: testUanRef
        });
      });

      it('should throw error if incorrect ref type specified', () => {
        expect(false).to.eql(true);
      });

    });

    describe('complaintDetails', () => {

      describe('complaintText', () => {
        it('It throws an error if not provided', () => {
          expect(false).to.eql(true);
        });
      });

      describe('applicationLocation', () => {

        beforeEach(() => {
          values = applicantTestValues;
        });

        it('If no location provided, applicationLocation is not set', () => {
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.complaintDetails).to.not.have.all.keys('applicationLocation');
        });

        it('If applied from "inside-uk", applicationLocation set to INSIDE_UK', () => {
          values['where-applied-from'] = 'inside-uk';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.complaintDetails.applicationLocation).to.eql('INSIDE_UK');
        });

        it('If applied from "outside-uk", applicationLocation set to OUTSIDE_UK', () => {
          values['where-applied-from'] = 'outside-uk';
          complaint = new Complaint(values);
          expect(complaint.complaintAttributes.complaint.complaintDetails.applicationLocation).to.eql('OUTSIDE_UK');
        });

        it.only('It throws an error if invalid "where-applied-from"', () => {
          values['where-applied-from'] = 'location';
          expect(new Complaint(values)).to.throw('invalid "where-applied-from" value');
        });
      });
    });


  });

});
