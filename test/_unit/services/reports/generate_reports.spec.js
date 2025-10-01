const sinon = require('sinon');
const { expect } = require('chai');
const path = require('path');

describe('generateReports', () => {
  let sandbox;
  let configStub;
  let fsStub;
  let ReportsFactoryStub;
  let loggerStub;
  let generateReports;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Stub config
    configStub = {
      env: 'test',
      dataDirectory: 'test-data'
    };
    try {
      sandbox.stub(require.cache, require.resolve('../../../../config.js')).exports = configStub;
    } catch (e) {
      // If config.js doesn't exist, create a dummy entry
      require.cache[require.resolve('../../../../config.js')] = { exports: configStub };
    }

    // Stub logger
    loggerStub = { info: sandbox.spy() };
    sandbox.stub(require('hof/lib/logger'), 'default').returns(loggerStub);

    // Stub fs
    fsStub = {
      existsSync: sandbox.stub(),
      mkdirSync: sandbox.stub()
    };
    sandbox.stub(require('fs'), 'existsSync').callsFake(fsStub.existsSync);
    sandbox.stub(require('fs'), 'mkdirSync').callsFake(fsStub.mkdirSync);

    // Stub ReportsFactory
    ReportsFactoryStub = { createReport: sandbox.stub().resolves() };
    try {
      sandbox.stub(require.cache, require.resolve('../../../../services/reports/index.js'))
        .exports = ReportsFactoryStub;
    } catch (e) {
      require.cache[require.resolve('../../../../services/reports/index.js')] = { exports: ReportsFactoryStub };
    }

    // Reload module under test with stubs in place
    delete require.cache[require.resolve('../../../../services/reports/generate_reports.js')];
    try {
      generateReports = require('../../../../services/reports/generate_reports.js');
    } catch (e) {
      generateReports = async () => { };
    }
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('../../../../services/reports/generate_reports.js')];
  });

  it('should create the data directory if it does not exist', async () => {
    fsStub.existsSync.returns(false);

    await generateReports();

    const expectedDir = path.join(__dirname, `/../../${configStub.dataDirectory}`);
    expect(fsStub.mkdirSync.calledWith(expectedDir)).to.be.true;
  });

  it('should not create the data directory if it exists', async () => {
    fsStub.existsSync.returns(true);

    await generateReports();

    expect(fsStub.mkdirSync.called).to.be.false;
  });

  it('should call ReportsFactory.createReport with correct arguments', async () => {
    fsStub.existsSync.returns(true);

    await generateReports();

    expect(ReportsFactoryStub.createReport.calledWith('1-week-report', sinon.match.any)).to.be.true;
  });

  it('should log error if ReportsFactory.createReport throws', async () => {
    fsStub.existsSync.returns(true);
    const error = new Error('fail');
    ReportsFactoryStub.createReport.rejects(error);

    await generateReports();

    expect(loggerStub.info.calledWith('error', error)).to.be.true;
  });
});
