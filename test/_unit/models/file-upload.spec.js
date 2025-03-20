const proxyquire = require('proxyquire');

describe('UploadModel', () => {
  let UploadModel;
  let model;
  let requestStub;
  let loggerStub;
  let uuidStub;
  let formDataStub;
  let formDataInstanceStub;
  let configMock;

  beforeEach(() => {
    requestStub = sinon.stub();
    loggerStub = {
      error: sinon.stub(),
      info: sinon.stub()
    };
    uuidStub = sinon.stub().returns('test-uuid');
    formDataInstanceStub = {
      append: sinon.stub(),
      getHeaders: sinon.stub().returns({})
    };
    formDataStub = sinon.stub().returns(formDataInstanceStub);

    configMock = {
      upload: {
        hostname: 'http://example.com'
      },
      keycloak: {
        token: 'http://example.com/token',
        username: 'user',
        password: 'pass',
        clientId: 'client',
        secret: 'secret'
      },
      env: 'test'
    };
    UploadModel = proxyquire(
      '../../../apps/ukvi-complaints/models/file-upload',
      {
        hof: {
          model: class {
            constructor() {
              this.attributes = {};
            }
            set(key, value) {
              this.attributes[key] = value;
            }
            get(key) {
              return this.attributes[key];
            }
            unset(key) {
              delete this.attributes[key];
            }
            request() {}
            url(attrs) {
              return `${attrs.url}/upload`;
            }
          }
        },
        uuid: { v4: uuidStub },
        'form-data': formDataStub,
        'hof/lib/logger': () => loggerStub,
        url: { parse: sinon.stub().returns({}) },
        '../../../config': configMock
      }
    );

    model = new UploadModel();
  });

  it('should set an id on instantiation', () => {
    expect(model.get('id')).to.equal('test-uuid');
  });

  describe('#save', () => {
    it('should throw an error if hostname is not defined', () => {
      configMock.upload.hostname = null;
      expect(() => model.save()).to.throw('File-vault hostname is not defined');
      expect(loggerStub.error.calledWith('File-vault hostname is not defined'))
        .to.be.true;
    });

    it('should send a request with form data', async () => {
      model.get = sinon
        .stub()
        .withArgs('data')
        .returns('file-data')
        .withArgs('name')
        .returns('file-name')
        .withArgs('mimetype')
        .returns('file-mimetype');
      model.request = requestStub.yields(null, {
        url: 'http://example.com/file/test'
      });

      await model.save();

      expect(
        formDataInstanceStub.append.calledWith('document', 'file-data', {
          filename: 'file-name',
          contentType: 'file-mimetype'
        })
      ).to.be.false;
    });

    it('should handle request errors', async () => {
      model.get = sinon
        .stub()
        .withArgs('data')
        .returns('file-data')
        .withArgs('name')
        .returns('file-name')
        .withArgs('mimetype')
        .returns('file-mimetype');
      model.request = requestStub.yields(new Error('Test Error'), null);

      try {
        await model.save();
      } catch (err) {
        expect(err.message).to.equal('File upload failed: Test Error');
        expect(
          loggerStub.error.calledWith(
            sinon.match.string.and(sinon.match(/Test Error/))
          )
        ).to.be.true;
      }
    });

    it('should handle empty or invalid response', async () => {
      model.get = sinon
        .stub()
        .withArgs('data')
        .returns('file-data')
        .withArgs('name')
        .returns('file-name')
        .withArgs('mimetype')
        .returns('file-mimetype');
      model.request = requestStub.yields(null, null);

      try {
        await model.save();
      } catch (err) {
        expect(err.message).to.equal(
          'Received empty or invalid response from file-vault'
        );
        expect(
          loggerStub.error.calledWith(
            'Received empty or invalid response from file-vault'
          )
        ).to.be.true;
      }
    });
  });

  describe('#auth', () => {
    it('should throw an error if any keycloak property is not defined', async () => {
      configMock.keycloak = {};
      try {
        await model.auth();
      } catch (err) {
        expect(err.message).to.include('Keycloak');
        expect(
          loggerStub.error.calledWith(
            sinon.match.string.and(sinon.match(/Keycloak/))
          )
        ).to.be.true;
      }
    });

    it('should retrieve access token successfully', async () => {
      model._request = sinon
        .stub()
        .resolves({ data: { access_token: 'test-token' } });

      const result = await model.auth();

      expect(result.bearer).to.equal('test-token');
      expect(loggerStub.info.calledWith('Successfully retrieved access token'))
        .to.be.true;
    });

    it('should handle errors while retrieving access token', async () => {
      model._request = sinon.stub().rejects({
        message: 'Request Error',
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: {}
        }
      });

      try {
        await model.auth();
      } catch (err) {
        expect(err.message).to.include('Request Error');
        expect(
          loggerStub.error.calledWith(
            sinon.match.string.and(sinon.match(/Request Error/))
          )
        ).to.be.true;
      }
    });
  });
});
