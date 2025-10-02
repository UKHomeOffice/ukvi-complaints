const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('generateReports', () => {
  // const configPath = require.resolve('../../../../config.js');
  // const indexPath = require.resolve('../../../../services/reports/index.js');

  let generateReports;
  let pathStub;
  let fsStub;
  let configStub;
  let createReportStub;
  let loggerStub;

  beforeEach(() => {
    pathStub = {
      join: sinon.stub()
    };
    fsStub = {
      existsSync: sinon.stub(),
      mkdirSync: sinon.stub()
    };
    configStub = {
      dataDirectory: '/data',
      env: 'test'
    };
    createReportStub = sinon.stub().resolves('mocked report');
    loggerStub = {
      info: sinon.stub()
    };
    console.log('logger stubbed');
    generateReports = proxyquire('../../../../services/reports/generate_reports.js', {
      path: pathStub,
      fs: fsStub,
      '/../../config.js': configStub,
      './index.js': {
        createReport: createReportStub
      },
      'hof/lib/logger': sinon.stub().returns(loggerStub)});
    console.log('generateReports proxied');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a data directory if it does not exist', async () => {
    fsStub.existsSync.returns(false);
    pathStub.join.returns('/mock/path/to/data');

    await generateReports();

    expect(fsStub.existsSync.calledWith('/mock/path/to/data')).to.be.true;
    expect(fsStub.mkdirSync.calledWith('/mock/path/to/data')).to.be.true;
  });

  it('should not create a data directory if it exists', async () => {
    fsStub.existsSync.returns(true);
    pathStub.join.returns('/mock/path/to/data');
    createReportStub.rejects(new Error('Failed to create report'));

    await generateReports();

    expect(fsStub.mkdirSync.notCalled).to.be.true;
  });
});