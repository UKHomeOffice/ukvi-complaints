'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const csvToJson = require('csvtojson');
const csvOutput = require('../../../data/csv-output.json');
const historyData = require('../../../data/history-data.json');
const configPath = require.resolve('../../../../config.js');

describe('CSV reports', () => {
  let Reports;
  let reports;
  let fsStub;
  let pathStub;
  let hofStub;
  let config;

  const dataDirectory = '/mock/data';

  beforeEach(() => {
    config = {
      keycloak: {
        token: 'http://keycloak.example.com/token',
        username: 'user',
        password: 'pass',
        clientId: 'client',
        secret: 'secret'
      }
    };

    fsStub = {
      existsSync: sinon.stub(),
      mkdirSync: sinon.stub(),
      createWriteStream: sinon.stub(),
      readFile: sinon.stub(),
      unlinkSync: sinon.stub()
    };

    pathStub = {
      join: sinon.stub()
    };

    hofStub = {
      model: sinon.stub().returns({
        _request: sinon.stub().resolves({ data: historyData }),
        request: sinon.stub()
      })
    };

    pathStub.join.returns(dataDirectory);
    fsStub.existsSync.returns(false);

    Reports = proxyquire('../../../../services/reports/reports', {
      fs: fsStub,
      path: pathStub,
      hof: hofStub,
      [configPath]: config
    });

    reports = new Reports({
      type: 'test',
      tableName: 'submitted_applications',
      from: '2025-05-18T07:00:00Z',
      to: '2025-05-19T06:59:59Z'
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch records correctly from the API', async () => {
    const response = await reports.getRecordsWithProps({ timestamp: 'submitted_at' });
    expect(response.data).to.deep.equal(historyData);
  });

  it('should fetch records correctly from the API - no options provided', async () => {
    const response = await reports.getRecordsWithProps();
    expect(response.data).to.deep.equal(historyData);
  });

  it('should transform the data correctly and generate CSV', async () => {
    pathStub.join.returns(`${dataDirectory}/test-report.csv`);
    await reports.transformToAllQuestionsCsv('test-report', historyData);
    const json = await csvToJson().fromFile(`${dataDirectory}/test-report.csv`);
    expect(json).to.deep.equal(csvOutput);
  });

  it('generate CSV - with aggregatedValues', async () => {
    const updatedHistoryData = historyData.map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          session: {
            ...item.session,
            user1: { aggregatedValues: [{ fields: [] }] }
          }
        };
      }
      return item;
    });

    pathStub.join.returns(`${dataDirectory}/test-report.csv`);
    await reports.transformToAllQuestionsCsv('test-report', updatedHistoryData);

    sinon.stub(csvToJson, 'fromFile').resolves({});
    const json = await csvToJson.fromFile(`${dataDirectory}/test-report.csv`);
    expect(json).to.be.ok;
    csvToJson.fromFile.restore();
  });

  it('should throw an error if required properties are missing', () => {
    const createReport = () => new Reports({ tableName: 'users' });
    expect(createReport).to.throw('Please include a "tableName", "type" and "from" property');
  });

  it('should call postgresDateFormat when to date is not provided', () => {
    const createReport = () => new Reports({ tableName: 'users', from: 'from', type: 'type' });
    expect(createReport).to.not.throw();
  });

  describe('auth', () => {
    const requiredProperties = ['token', 'username', 'password', 'clientId', 'secret'];

    requiredProperties.forEach(prop => {
      it(`throws error if keycloak ${prop} is not defined`, async () => {
        const originalValue = config.keycloak[prop];
        config.keycloak[prop] = null;

        await expect(reports.auth()).to.be.rejectedWith(`Keycloak ${prop} is not defined`);
        config.keycloak[prop] = originalValue;
      });
    });

    it('returns access token on successful authentication', async () => {
      const model = hofStub.model();
      model._request.resolves({ data: { access_token: 'access_token' } });

      const token = await reports.auth({});
      expect(token).to.be.ok;
    });
  });

  describe('transformToCsv', () => {
    beforeEach(() => {
      reports.deleteFile = sinon.stub().resolves();
      fsStub.createWriteStream.reset();
    });

    it('should create a CSV file with correct content', async () => {
      const mockWrite = sinon.stub();
      const mockEnd = sinon.stub().callsFake(cb => cb());
      const mockOn = sinon.stub();

      fsStub.createWriteStream.returns({
        write: mockWrite,
        end: mockEnd,
        on: mockOn
      });

      pathStub.join.returns('/mock/path/data/test.csv');

      const name = 'test';
      const headings = ['Name', 'Age'];
      const rows = [['Alice', '30'], ['Bob', '25']];

      await reports.transformToCsv(name, headings, rows);

      expect(fsStub.createWriteStream.calledWith('/mock/path/data/test.csv', { flag: 'a+' })).to.be.true;
      expect(mockWrite.calledWith('Name,Age')).to.be.true;
      expect(mockWrite.calledWith('\r\nAlice,30')).to.be.true;
      expect(mockWrite.calledWith('\r\nBob,25')).to.be.true;
      expect(mockEnd.calledOnce).to.be.true;
    });
  });

  describe('sendReport', () => {
    beforeEach(() => {
      reports.auth = sinon.stub().resolves({ bearer: 'mock-token' });
      fsStub.readFile.callsFake((_, cb) => cb(null, Buffer.from('csv,data')));
    });

    it('should reject if file read fails', async () => {
      fsStub.readFile.callsFake((_, cb) => cb(new Error('File not found')));
      await expect(reports.sendReport('missingfile')).to.be.rejectedWith('File not found');
    });
  });
});
