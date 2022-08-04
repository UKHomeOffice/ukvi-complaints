/* eslint-disable max-nested-callbacks */
'use strict';
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('utils', () => {
  let utils;
  let createSub;
  let sendStub;
  let testSchema = {
    'test': 'schema'
  };

  const testUuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
  const validComplaintData = {
    creationDate: '2021-03-17',
    complaint: {
      reporterDetails: {
        applicantType: 'AGENT',
        applicantDetails: {
          applicantName: 'pp',
          applicantNationality: 'Ukraine',
          applicantDob: '1980-02-02'
        },
        agentDetails: {
          agentName: 'mm',
          agentType: 'LEGAL_REP',
          agentEmail: 'test@test.com',
          agentPhone: '12435667889'
        },
      },
      complaintDetails: {
        complaintText: 'test',
        applicationLocation: 'INSIDE_UK',
        problemExperienced: 'TECHNICAL_ISSUES'
      },
      reference: {
        referenceType: 'GWF_REF', reference: 'GWF012345678'
      },
      complaintType: 'SUBMITTING_APPLICATION'
    }
  };

  const invalidComplaintData = {
    invalid: 'schema'
  };


  beforeEach(() => {
    sendStub = sinon.stub().resolves();
    sendStub.withArgs({
      id: testUuid,
      body: JSON.stringify(invalidComplaintData)
    }).rejects();
    createSub = sinon.stub().returns({
      send: sendStub
    });

    utils = proxyquire('../../../apps/ukvi-complaints/lib/utils', {
      'sqs-producer': {
        Producer: {
          create: createSub
        }
      },
      '../schema/decs.json': testSchema
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#validateAgainstSchema', () => {
    let testValidator;
    let validateStub;

    beforeEach(() => {
      validateStub = sinon.stub();
      validateStub.withArgs(validComplaintData, testSchema).returns({
        errors: []
      });
      validateStub.withArgs(invalidComplaintData, testSchema).returns({
        errors: [
          'validation error'
        ]
      });

      testValidator = {
        validate: validateStub
      };
    });

    it('returns true if the complaintData object fits the schema', () => {
      expect(utils.validAgainstSchema(validComplaintData, testValidator)).to.eql(true);
    });

    it('calls validate method on the validator once', () => {
      utils.validAgainstSchema(validComplaintData, testValidator);

      expect(validateStub).to.have.been.calledOnceWith(validComplaintData, testSchema);
    });

    it('throws an error if the complaintData object does not fit the schema', () => {
      expect(() => utils.validAgainstSchema(invalidComplaintData, testSchema)).to.throw();
    });

  });

  describe('#sendToQueue', () => {

    it('calls create on the sqs producer with SQS parameters', () => {
      utils.sendToQueue(validComplaintData, testUuid);
      expect(createSub).to.have.been.calledOnceWith({
        queueUrl: 'http://localhost:4566/000000000000/local-queue',
        region: 'eu-west-2',
        accessKeyId: '',
        secretAccessKey: '',
      });
    });

    it('calls send on sqs producer with a unique id and stringifyed complaint data', () => {
      utils.sendToQueue(validComplaintData, testUuid);
      expect(sendStub).to.have.been.calledOnceWith(
        [
          {
            id: testUuid,
            body: JSON.stringify(validComplaintData),
          }
        ]
      );
    });

    it('rejects if send fails', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(utils.sendToQueue(invalidComplaintData)).to.be.rejected;
    });

  });

});
