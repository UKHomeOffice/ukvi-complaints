const proxyquire = require('proxyquire');

describe('File upload model tests', () => {
  let UploadModel;
  let mockConfig;
  let mockLogger;
  let mockRequest;

  beforeEach(() => {
    mockConfig = {
      upload: {
        hostname: 'htttp://file-valut'
      },
      keycloak: {
        token: 'http://keycloak/token',
        username: 'test-user',
        password: 'test-pwd',
        clientId: 'test-client-id',
        secret: 'test-secret'
      }
    };

    mockLogger = {
      error: sinon.stub(),
      info: sinon.stub()
    };
    mockRequest = sinon.stub();

    UploadModel = proxyquire(
      '../../../apps/ukvi-complaints/models/file-upload',
      {
        '../../../config': mockConfig,
        'hof/lib/logger': () => mockLogger
      }
    );
  });

  describe('save', () => {
    it('should throw error - hostname not defined', () => {
      delete mockConfig.upload.hostname;
      const model = new UploadModel();
      expect(() => model.save()).to.throw('File-vault hostname is not defined');
      expect(mockLogger.error.calledWith('File-vault hostname is not defined'))
        .to.be.true;
    });

    it('should reject when request fails', async () => {
      const model = new UploadModel();
      model.get = sinon.stub().returns('test-result');
      mockRequest.yields(new Error('request failed'));

      model.request = mockRequest;

      try {
        await model.save();
      } catch (err) {
        expect(err.message).to.deep.equal('File upload failed: request failed');
      }
    });

    it('should throw error if no url in the response', async () => {
      const model = new UploadModel();
      model.get = sinon.stub().returns('test-result');
      mockRequest.yields(null, {});

      model.request = mockRequest;

      try {
        await model.save();
      } catch (err) {
        expect(mockLogger.error.called).to.be.true;
      }
    });

    it('should unset data after successful request', async () => {
      const model = new UploadModel();
      model.get = sinon.stub().returns('test-result');
      model.set = sinon.stub();
      model.unset = sinon.stub();
      mockRequest.yields(null, { url: 'http://file-vault/file/test' });

      model.request = mockRequest;

      await model.save();
      expect(
        model.set.calledWith({
          url: 'http://file-vault/file/generate-link/test'
        })
      ).to.be.true;
    });
  });

  describe('auth', () => {
    it('should throw error - required keycloak property is missing', async () => {
      delete mockConfig.keycloak.username;

      const model = new UploadModel();
      try {
        await model.auth();
      } catch (err) {
        expect(err.message).to.equal('Keycloak username is not defined');
      }
    });

    it('should throw error when request fails', async () => {
      const model = new UploadModel();
      mockRequest.rejects({
        response: {}
      });
      model._request = mockRequest;

      try {
        await model.auth();
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should throw error when response does not contain access token', async () => {
      const model = new UploadModel();
      mockRequest.resolves({ data: {} });
      model._request = mockRequest;

      try {
        await model.auth();
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should return the token when auth is successful', async () => {
      const model = new UploadModel();
      mockRequest.resolves({ data: { access_token: 'test-token' } });
      model._request = mockRequest;

      const result = await model.auth();
      expect(result).to.deep.equal({ bearer: 'test-token' });
    });
  });
});
