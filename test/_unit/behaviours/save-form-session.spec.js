'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire');

const config = require('../../../config');

// Mock hof and its model
const mockRequestStub = sinon.stub();
const ModelMock = {
  model: function () {
    return {
      _request: mockRequestStub
    };
  }
};

// Load SaveFormBehaviour with mocked hof
const SaveFormBehaviour = proxyquire('../../../apps/ukvi-complaints/behaviours/save-form-session', {
  hof: ModelMock
});

class MockSuperClass {
  saveValues(req, res, next) {
    return next();
  }
}

const CustomClass = SaveFormBehaviour(MockSuperClass);
const instance = new CustomClass();

describe('save-form-session', () => {
  describe('requestBody', () => {
    it('should return POST request with submitted_at timestamp', () => {
      const postObj = { foo: 'bar' };
      const result = instance.requestBody(postObj);

      expect(result.url).to.equal(`${config.saveService.host}:${config.saveService.port}/submitted_applications`);
      expect(result.method).to.equal('POST');
      expect(result.data.foo).to.equal('bar');
      expect(result.data.submitted_at).to.be.an.instanceof(Date);
    });
  });

  describe('getSession', () => {
    it('should clean session and update steps', () => {
      const req = {
        path: '/step1',
        sessionModel: {
          toJSON: () => ({
            'csrf-secret': 'secret',
            errors: ['error'],
            steps: []
          })
        }
      };

      const session = instance.getSession(req);
      expect(session['csrf-secret']).to.be.undefined;
      expect(session.errors).to.be.undefined;
      expect(session.steps).to.include('/step1');
    });

    it('should filter out /edit and /change steps', () => {
      const req = {
        path: '/step2',
        sessionModel: {
          toJSON: () => ({
            steps: ['/step1', '/step1/edit', '/step2/change']
          })
        }
      };

      const session = instance.getSession(req);
      expect(session.steps).to.deep.equal(['/step1', '/step2']);
    });
  });

  describe('saveValues', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = {
        sessionModel: {
          get: sinon.stub().callsFake(key => {
            const data = {
              id: 'abc123',
              'submission-reference': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            };
            return data[key];
          }),
          set: sinon.stub(),
          unset: sinon.stub(),
          toJSON: sinon.stub().returns({
            'csrf-secret': 'value',
            errors: 'value1',
            steps: ['/step1', '/step2']
          })
        },
        log: sinon.stub(),
        path: '/step1'
      };
      res = {};
      next = sinon.stub();
      mockRequestStub.reset();
    });

    it('should skip saving in local/test env', async () => {
      config.env = 'test';
      await instance.saveValues(req, res, next);
      expect(next.calledOnce).to.be.true;
    });

    it('should call model._request and proceed on success', async () => {
      config.env = 'production';
      mockRequestStub.resolves({ data: [{ id: 'new-id' }] });

      await instance.saveValues(req, res, next);
      expect(next.calledOnce).to.be.true;
    });

    it('should log error if response is invalid', async () => {
      config.env = 'production';
      mockRequestStub.resolves({ data: [{}] });

      await instance.saveValues(req, res, next);
      expect(req.log.calledWithMatch('error', sinon.match(
        msg => msg.includes("Id hasn't been received")))).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('should call next with error on request failure', async () => {
      config.env = 'production';
      const error = new Error('Request failed');
      mockRequestStub.rejects(error);

      await instance.saveValues(req, res, next);
      expect(next.calledWith(error)).to.be.true;
    });
  });
});
