/* eslint-disable max-nested-callbacks */
'use strict';
const proxyquire = require('proxyquire');
const {
  createReference,
  getFormattedEnum,
  createReporterDetails
} = require('../../../../apps/ukvi-complaints/lib/json-converters/complaint');

describe('complaint', () => {
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

  describe('getFormattedEnum', () => {
    it('Should return the correct enum if a valid complaint field is passed', () => {
      const formattedEnum = getFormattedEnum('immigration-application', 'reason');
      expect(formattedEnum).to.eql('SUBMITTING_APPLICATION');
    });

    it('Should throw an error if an invalid complaint field is passed', () => {
      const reference = 'reason';
      expect(() => getFormattedEnum('invalid', reference)).to.throw(`invalid "${reference}" value`);
    });
  });

  describe('createReporterDetails', () => {
    let reporterDetailsValues;

    describe('applicant', () => {
      beforeEach(() => {
        reporterDetailsValues = Object.assign({}, applicantTestValues);
      });

      it('Should return applicant details without phone number if not included', () => {
        const reporterDetails = createReporterDetails(reporterDetailsValues);

        expect(reporterDetails).to.eql({
          applicantType: applicantTypeApplicant,
          applicantName: testApplicantName,
          applicantNationality: testApplicantNationality,
          applicantDob: testApplicantDob,
          applicantEmail: testApplicantEmail,
        });
      });

      it('Should return applicant details with phone number if included', () => {
        reporterDetailsValues['applicant-phone'] = testApplicantPhone;
        const reporterDetails = createReporterDetails(reporterDetailsValues);
        expect(reporterDetails).to.eql({
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
      let agentValues;

      beforeEach(() => {
        agentValues = Object.assign({}, agentTestValues);
      });

      it('it should return agent and applicant details with agentType RELATIVE', () => {
        agentValues['who-representing'] = 'relative';
        const reporterDetails = createReporterDetails(agentValues);
        expect(reporterDetails).to.eql({
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
        agentValues['who-representing'] = 'legal-rep';
        const reporterDetails = createReporterDetails(agentValues);
        expect(reporterDetails).to.eql({
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
        agentValues['who-representing'] = 'sponsor';
        const reporterDetails = createReporterDetails(agentValues);
        expect(reporterDetails).to.eql({
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
        agentValues['who-representing'] = 'support-org';
        const reporterDetails = createReporterDetails(agentValues);
        expect(reporterDetails).to.eql({
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
        agentValues['agent-phone'] = testAgentPhone;
        agentValues['who-representing'] = 'relative';
        const reporterDetails = createReporterDetails(agentValues);
        expect(reporterDetails).to.eql({
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
        agentValues['who-representing'] = 'error-agent';
        expect(() => createReporterDetails(agentValues)).to.throw('invalid "who-representing" value');
      });

    });

  });

  describe('createReference', () => {
    let referenceValues;

    beforeEach(() => {
      referenceValues = Object.assign({}, applicantTestValues);
    });

    it('If "gwf" reference, reference number will be set on GWF_REF', () => {
      referenceValues['reference-numbers'] = 'gwf';
      referenceValues['gwf-reference'] = testGwfRef;

      const reference = createReference(referenceValues);

      expect(reference).to.eql({
        referenceType: 'GWF_REF',
        reference: testGwfRef
      });
    });

    it('If "ho" reference, reference number will be set on HO_REF', () => {
      referenceValues['reference-numbers'] = 'ho';
      referenceValues['ho-reference'] = testHoRef;
      const reference = createReference(referenceValues);
      expect(reference).to.eql({
        referenceType: 'HO_REF',
        reference: testHoRef
      });
    });

    it('If "ihs" reference, reference number will be set on IHS_REF', () => {
      referenceValues['reference-numbers'] = 'ihs';
      referenceValues['ihs-reference'] = testIhsRef;
      const reference = createReference(referenceValues);
      expect(reference).to.eql({
        referenceType: 'IHS_REF',
        reference: testIhsRef
      });
    });

    it('If "uan" reference, reference number will be set on UAN_REF', () => {
      referenceValues['reference-numbers'] = 'uan';
      referenceValues['uan-reference'] = testUanRef;
      const reference = createReference(referenceValues);
      expect(reference).to.eql({
        referenceType: 'UAN_REF',
        reference: testUanRef
      });
    });

    it('should throw error if incorrect ref type specified', () => {
      referenceValues['reference-numbers'] = 'fff';
      expect(() => createReference(referenceValues)).to.throw('invalid "reference-numbers" value');
    });

  });

  describe('getComplaint', () => {
    let getComplaint;
    let complaintValues;
    const creationDate = '2021-01-20';

    beforeEach(() => {
      complaintValues = Object.assign({}, applicantTestValues);

      const momentStub = sinon.stub().returns({
        format: () => (creationDate)
      });

      getComplaint = proxyquire('../../../../apps/ukvi-complaints/lib/json-converters/complaint', {
        'moment': momentStub
      }).getComplaint;
    });

    it('Should return an object', () => {
      const complaint = getComplaint(complaintValues);
      expect(complaint).to.be.an('object');
    });

    it('Data returned should have a creationDate', () => {
      const complaint = getComplaint(complaintValues);
      expect(complaint.creationDate).to.eql(creationDate);
    });

    it('Data returned should have a complaintText', () => {
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint.complaintDetails.complaintText).to.eql(testComplaintDetails);
    });

    it('Data returned should not include a reference if reference-number is not provided', () => {
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint).to.not.have.all.keys('reference');
    });

    it('Data returned should not include a reference if reference-numbers is specified as "none"', () => {
      complaintValues['reference-numbers'] = 'none';
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint).to.not.have.all.keys('reference');
    });

    it('Data returned should not include a location if where-applied-from is not provided', () => {
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint).to.not.have.all.keys('applicationLocation');
    });

    it('If applied from "inside-uk", applicationLocation set to INSIDE_UK', () => {
      complaintValues['where-applied-from'] = 'inside-uk';
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint.complaintDetails.applicationLocation).to.eql('INSIDE_UK');
    });

    it('If applied from "outside-uk", applicationLocation set to OUTSIDE_UK', () => {
      complaintValues['where-applied-from'] = 'outside-uk';
      const complaint = getComplaint(complaintValues);
      expect(complaint.complaint.complaintDetails.applicationLocation).to.eql('OUTSIDE_UK');
    });

    it('It throws an error if invalid "where-applied-from"', () => {
      complaintValues['where-applied-from'] = 'location';
      expect(() => getComplaint(complaintValues)).to.throw('invalid "where-applied-from" value');
    });
  });
});
