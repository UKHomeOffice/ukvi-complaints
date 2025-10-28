'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire');
const historyData = require('../../../data/history-data.json');
const configPath = require.resolve('../../../../config.js');

describe('Reports Service', () => {
  let Reports;
  let reports;
  let fsStub;
  let pathStub;
  let hofStub;
  let config;
  let utilitiesStub;
  let notifyClientStub;

  const dataDirectory = '/mock/data';

  const loggerInstanceStub = {
    log: sinon.stub(),
    error: sinon.stub()
  };

  const winstonStub = {
    createLogger: sinon.stub().returns(loggerInstanceStub)
  };

  beforeEach(() => {
    config = {
      keycloak: {
        token: 'http://keycloak.example.com/token',
        username: 'user',
        password: 'pass',
        clientId: 'client',
        secret: 'secret'
      },
      email: {
        notifyApiKey: 'fake-key',
        csvReportTemplateId: 'template-id',
        csvReportEmail: 'team@example.com'
      },
      saveService: {
        protocol: 'http',
        host: 'localhost',
        port: '3000'
      },
      upload: {
        hostname: 'http://upload.example.com'
      }
    };

    notifyClientStub = {
      sendEmail: sinon.stub().resolves()
    };

    utilitiesStub = {
      postgresDateFormat: sinon.stub().returns('2025-05-19T06:59:59Z'),
      formatDate: sinon.stub().returns('13 October'),
      formatDateTime: sinon.stub().returns('13 October 2025 13:45'),
      sanitiseCsvValue: sinon.stub().callsFake(val => val),
      NotifyClient: sinon.stub().returns(notifyClientStub)
    };

    fsStub = {
      createWriteStream: sinon.stub(),
      readFile: sinon.stub(),
      unlink: sinon.stub()
    };

    pathStub = {
      join: sinon.stub().returns(`${dataDirectory}/test-report.csv`)
    };

    hofStub = {
      model: sinon.stub().returns({
        _request: sinon.stub().resolves({ data: historyData }),
        request: sinon.stub().resolves({ url: 'http://upload.example.com/file/abc123?token=xyz' })
      })
    };

    Reports = proxyquire('../../../../services/reports/reports', {
      'node:fs': fsStub,
      'node:path': pathStub,
      hof: hofStub,
      [configPath]: config,
      '../../lib/utils': utilitiesStub,
      winston: winstonStub
    });

    reports = new Reports({
      type: 'test',
      tableName: 'submitted_applications',
      from: '2025-05-21T07:00:00Z',
      to: '2025-05-28T06:59:59Z'
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('constructor', () => {
    it('should throw error if required properties are missing', () => {
      const createReport = () => new Reports({ tableName: 'submitted_applications' });
      expect(createReport).to.throw('Please include a "tableName", "type", "from" and "to" property');
    });
  });

  describe('auth', () => {
    it('should throw error if keycloak config is missing', async () => {
      config.keycloak.token = null;
      await expect(reports.auth()).to.be.rejectedWith('Keycloak token is not defined');
    });

    it('should return access token on success', async () => {
      // Ensure stub returns a response with access_token
      hofStub.model.returns({ _request: sinon.stub().resolves({ data: { access_token: 'mock-token' } }) });
      const token = await reports.auth();
      expect(token).to.deep.equal({ bearer: 'mock-token' });
    });
  });

  describe('getRecordsWithProps', () => {
    it('should fetch records with props', async () => {
      const response = await reports.getRecordsWithProps({ timestamp: 'submitted_at' });
      expect(response.data).to.deep.equal(historyData);
    });

    it('should fetch records without props', async () => {
      const response = await reports.getRecordsWithProps();
      expect(response.data).to.deep.equal(historyData);
    });
  });

  describe('transformToAllQuestionsCsv', () => {
    it('should transform and write CSV from history data', async function () {
      const mockWrite = sinon.stub();
      const mockEnd = sinon.stub().callsFake(cb => cb && cb());
      const mockOn = sinon.stub();

      fsStub.createWriteStream.returns({
        write: mockWrite,
        end: mockEnd,
        on: mockOn
      });

      fsStub.unlink.callsFake((_, cb) => cb(null));

      await reports.transformToAllQuestionsCsv('test-report', historyData);

      expect(mockWrite.called).to.be.true;
      expect(mockEnd.calledOnce).to.be.true;
    });
  });

  describe('sendReport', () => {
    beforeEach(() => {
      reports.auth = sinon.stub().resolves({ bearer: 'mock-token' });
    });

    it('should reject if file read fails', async () => {
      fsStub.readFile.callsFake((_, cb) => cb(new Error('File not found')));
      await expect(reports.sendReport('missingfile')).to.be.rejectedWith('File not found');
    });

    it('should send report and delete file', async () => {
      fsStub.readFile.callsFake((_, cb) => cb(null, Buffer.from('csv,data')));
      fsStub.unlink.callsFake((_, cb) => cb(null));

      await reports.sendReport('test-report');

      expect(notifyClientStub.sendEmail.calledOnce).to.be.true;

      expect(loggerInstanceStub.log.calledWithMatch({
        level: 'info',
        message: sinon.match(/UKVIC CSV generated for test, UUID is:/)
      })).to.be.true;

      expect(loggerInstanceStub.log.calledWithMatch({
        level: 'info',
        message: sinon.match(/Email sent to UKVIC CSV users successfully/)
      })).to.be.true;
    });

    it('should log error if notifyClient.sendEmail fails', async () => {
      fsStub.readFile.callsFake((_, cb) => cb(null, Buffer.from('csv,data')));
      fsStub.unlink.callsFake((_, cb) => cb(null));

      // Simulate failure in sendEmail
      notifyClientStub.sendEmail.rejects(new Error('Email failed'));

      await expect(reports.sendReport('test-report')).to.be.rejectedWith('Email failed');

      expect(loggerInstanceStub.log.calledWithMatch({
        level: 'info',
        message: sinon.match(/Error generated for UKVIC for test CSV:/)
      })).to.be.true;
    });
  });

  describe('private methods', () => {
    it('should add queries to url', () => {
      const url = reports._addQueries('http://example.com', { a: 1, b: 2 });
      expect(url).to.include('a=1');
      expect(url).to.include('b=2');
    });

    it('should collect fields and translations', () => {
      utilitiesStub.sanitiseCsvValue.returnsArg(0);
      // Mock require for translations
      const fields = { foo: { options: { bar: { label: 'Bar' } } } };
      const pages = { confirm: { fields: { bar: { label: 'Bar' } } } };
      const requireStub = sinon.stub();
      requireStub.withArgs('../../apps/ukvi-complaints/translations/src/en/fields').returns(fields);
      requireStub.withArgs('../../apps/ukvi-complaints/translations/src/en/pages').returns(pages);
      const originalRequire = module.constructor.prototype.require;
      module.constructor.prototype.require = requireStub;
      const result = reports._collectFieldsAndTranslations();
      expect(result[0].pagesAndTranslations).to.be.an('array');
      expect(result[0].fieldsAndTranslations).to.be.an('array');
      module.constructor.prototype.require = originalRequire;
    });

    it('should handle deleteFile with ENOENT error gracefully', async () => {
      fsStub.unlink.callsFake((_, cb) => cb({ code: 'ENOENT' }));
      await reports._deleteFile('/mock/file.csv', () => { throw new Error('Should not be called'); });
    });

    it('should call callback on deleteFile error (not ENOENT)', async () => {
      let called = false;
      fsStub.unlink.callsFake((_, cb) => cb({ code: 'EACCES' }));
      await reports._deleteFile('/mock/file.csv', () => { called = true; });
      expect(called).to.be.true;
    });
  });
});
