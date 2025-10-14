const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('generateReports', () => {
  let generateReports;
  let pathStub;
  let fsStub;
  let configStub;
  let createReportStub;
  let loggerStub;

  const mockDataPath = '/mock/path/to/data';

  beforeEach(() => {
    // Stub path.join to always return the mock path
    pathStub = {
      join: sinon.stub().returns(mockDataPath)
    };

    // Stub fs methods
    fsStub = {
      existsSync: sinon.stub(),
      mkdirSync: sinon.stub()
    };

    // Stub config
    configStub = {
      dataDirectory: 'data',
      env: 'test'
    };

    // Stub createReport
    createReportStub = sinon.stub().resolves('mocked report');

    // Stub logger
    loggerStub = {
      info: sinon.stub()
    };

    // Load the module with proxyquire
    generateReports = proxyquire('../../../../services/reports/generate_reports.js', {
      path: pathStub,
      fs: fsStub,
      '../../config.js': configStub,
      './index.js': {
        createReport: createReportStub
      },
      'hof/lib/logger': sinon.stub().returns(loggerStub)
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a data directory if it does not exist', async () => {
    fsStub.existsSync.returns(false);

    await generateReports();

    expect(fsStub.existsSync.calledOnce).to.be.true;
    expect(fsStub.mkdirSync.calledOnceWith(mockDataPath)).to.be.true;
  });

  it('should not create a data directory if it exists', async () => {
    fsStub.existsSync.returns(true);
    createReportStub.rejects(new Error('Failed to create report'));

    await generateReports();

    expect(fsStub.existsSync.calledOnce).to.be.true;
    expect(fsStub.mkdirSync.notCalled).to.be.true;
    expect(loggerStub.info.calledWith('error')).to.be.true;
  });
});
