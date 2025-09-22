'use strict';

const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const SetSubmissionReferenceBehaviour = require('../../../apps/ukvi-complaints/behaviours/set-submission-reference');

describe('set-submission-reference', () => {
  class Base {
    getValues() {}
  }

  let req;
  let res;
  let next;
  let instance;
  let getValuesStub;

  beforeEach(() => {
    req = {
      sessionModel: {
        set: sinon.stub(),
        get: sinon.stub()
      },
      log: sinon.stub()
    };
    res = {};
    next = sinon.stub();

    // getValuesStub = sinon.stub(Base.prototype, 'getValues').callsFake((reqArg, resArg, nextArg) => reqArg);
    getValuesStub = sinon.stub(Base.prototype, 'getValues').callsFake(reqArg => reqArg);

    const CustomClass = SetSubmissionReferenceBehaviour(Base);
    instance = new CustomClass();
  });

  afterEach(() => {
    getValuesStub.restore();
  });

  describe('getValues', () => {
    it('should set the submission reference if it exists in session', () => {
      const existingUuid = uuidv4();
      req.sessionModel.get.withArgs('submission-reference').returns(existingUuid);

      instance.getValues(req, res, next);

      expect(req.sessionModel.get.calledWith('submission-reference')).to.be.true;
      expect(req.sessionModel.set.calledWith('submission-reference', existingUuid)).to.be.true;
      expect(req.log.calledWithMatch('info', sinon.match(msg => msg.includes(existingUuid)))).to.be.true;
    });

    it('should generate and set a new submission reference if not in session', () => {
      req.sessionModel.get.withArgs('submission-reference').returns(undefined);

      instance.getValues(req, res, next);

      expect(req.sessionModel.set.calledWithMatch('submission-reference', sinon.match.string)).to.be.true;
      expect(req.log.calledWithMatch('info', sinon.match(msg => msg.includes('Submission Reference:')))).to.be.true;
    });
  });
});
