'use strict';
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('SendToSQS', () => {
  let res;
  let req;
  let badReq;
  let badDataReq;
  let nextStub;
  let SendToSQS;
  let testSendToSQS;
  let formatComplaintDataStub;
  let sendToQueueStub;
  let validAgainstSchemaStub;
  let uuidStub;

  const testUuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

  const complaintData = {
    data: 'test'
  };
  const badComplaintData = {
    data: 'error'
  };
  const testError = new Error('testError');

  class Base {}

  beforeEach(() => {
    req = {
      sessionModel: {
        attributes: 'test attributes'
      }
    };

    badReq = {
      sessionModel: {
        attributes: 'bad attributes'
      }
    };

    badDataReq = {
      sessionModel: {
        attributes: 'bad data'
      }
    };

    nextStub = sinon.stub();

    uuidStub = sinon.stub().returns(testUuid);

    validAgainstSchemaStub = sinon.stub().returns(true);

    formatComplaintDataStub = sinon.stub().returns(complaintData);
    formatComplaintDataStub.withArgs(badReq.sessionModel.attributes).throws(testError);
    formatComplaintDataStub.withArgs(badDataReq.sessionModel.attributes).returns(badComplaintData);

    sendToQueueStub = sinon.stub();
    sendToQueueStub.withArgs(complaintData, testUuid).resolves();
    sendToQueueStub.withArgs(badComplaintData, testUuid).rejects(testError);

    const Behaviour = proxyquire('../../../apps/ukvi-complaints/behaviours/send-to-sqs', {
      '../../../config': {
        sendToQueue: true
      },
      '../../../lib/utils': {
        validAgainstSchema: validAgainstSchemaStub,
        sendToQueue: sendToQueueStub,
      },
      'uuid': {
        v4: uuidStub
      },
      '../../../lib/format-complaint-data': formatComplaintDataStub
    });

    SendToSQS = Behaviour(Base);
    testSendToSQS = new SendToSQS();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('saveValues', () => {
    describe('config.writeToCasework', () => {
      it('If false sendToQueue should not be called', () => {
        const SQSBehaviour = proxyquire('../../../apps/ukvi-complaints/behaviours/send-to-sqs', {
            '../../../config': {
              sendToQueue: false
            },
            '../../../lib/utils': {
              validAgainstSchema: validAgainstSchemaStub,
              sendToQueue: sendToQueueStub,
            },
            '../../../lib/format-complaint-data': formatComplaintDataStub
          }
        );

        const SendToSQSBehaviour = SQSBehaviour(Base);
        const sendToSQSBehaviour = new SendToSQSBehaviour();

        sendToSQSBehaviour.saveValues(req, res, nextStub);

        expect(sendToQueueStub).to.have.callCount(0);

      });

    });

    describe('If valid complaint data', () => {
      it('formatComplaintData should have been called once with sessionModel attributes', () => {
        testSendToSQS.saveValues(req, res, nextStub);
        expect(formatComplaintDataStub).to.have.been.calledOnceWith(req.sessionModel.attributes);
      });

      it('sendToQueue should be called once with complaint data', () => {
        testSendToSQS.saveValues(req, res, nextStub);
        expect(sendToQueueStub).to.have.been.calledOnceWith(complaintData);
      });

      it('next should be called once with no arguments', () => {
        testSendToSQS.saveValues(req, res, nextStub)
          .then(() => {
            expect(nextStub).to.have.been.calledOnceWith();
          });
      });


    });

    describe('If invalid complaint data', () => {
      it('should pass the error to the next middleware', () => {
        testSendToSQS.saveValues(badReq, res, nextStub);
        expect(nextStub).to.have.been.calledOnceWith(testError);
      });

      it('should add formNotSubmitted flag to the error', () => {
        testSendToSQS.saveValues(badReq, res, nextStub);
        expect(testError.formNotSubmitted).to.eql(true);
      });
    });

    describe('If sendToQueue rejects', () => {
      it('should pass the error to the next middleware', () => {
        testSendToSQS.saveValues(badDataReq, res, nextStub)
          .then(() => {
            expect(nextStub).to.have.been.calledOnceWith(testError);
          });

      });

      it('should add formNotSubmitted flag to the error', () => {
        testSendToSQS.saveValues(badDataReq, res, nextStub)
          .then(() => {
            expect(testError.formNotSubmitted).to.eql(true);
          });
      });
    });
  });
});
