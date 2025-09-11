'use strict';

const { expect } = require('chai');
const sinon = require('sinon');
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
    it('should return POST request when id is undefined', () => {
      const result = instance.requestBody(undefined, {}, { foo: 'bar' });
      expect(result).to.deep.equal({
        url: `${config.saveService.host}:${config.saveService.port}/submitted_applications`,
        method: 'POST',
        data: { foo: 'bar' }
      });
    });

    it('should return PATCH request when id is provided', () => {
      const result = instance.requestBody('123', { patch: true }, {});
      expect(result).to.deep.equal({
        url: `${config.saveService.host}:${config.saveService.port}/submitted_applications/123`,
        method: 'PATCH',
        data: { patch: true }
      });
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
            'valid-token': true,
            'user-cases': [],
            steps: []
          })
        }
      };

      const session = instance.getSession(req);
      expect(session['csrf-secret']).to.be.undefined;
      expect(session.errors).to.be.undefined;
      expect(session['valid-token']).to.be.undefined;
      expect(session['user-cases']).to.be.undefined;
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
              'submission-reference': 'ref456'
            };
            return data[key];
          }),
          set: sinon.stub(),
          unset: sinon.stub(),
          toJSON: sinon.stub().returns({
            'csrf-secret': 'value',
            errors: 'value1',
            'valid-token': 'value2',
            'user-cases': 'value3',
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

    it('should call model._request and set id on success', async () => {
      config.env = 'production';
      mockRequestStub.resolves({ data: [{ id: 'new-id' }] });

      await instance.saveValues(req, res, next);
      expect(req.sessionModel.set.calledWith('id', 'new-id')).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('should unset id and log error if response is invalid', async () => {
      config.env = 'production';
      mockRequestStub.resolves({ data: [{}] });

      await instance.saveValues(req, res, next);
      expect(req.sessionModel.unset.calledWith('id')).to.be.true;
      expect(req.log.calledWithMatch('error', sinon.match(
        msg => msg.includes("Id hasn't been received")))).to.be.true;
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
