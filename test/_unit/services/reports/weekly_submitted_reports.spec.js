'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire');
const mockCsvOutput = require('../../../data/csv-output.json');
const mockHistoryData = require('../../../data/history-data.json');
const utilitiesPath = require.resolve('../../../../lib/utils.js');
const reportsPath = require.resolve('../../../../services/reports/reports.js');

describe('weekly_submitted_reports', () => {
  let WeeklySubmittedReports;
  let ReportsStub;
  let logger;
  let utilitiesStub;

  beforeEach(() => {
    logger = {
      log: sinon.stub()
    };

    utilitiesStub = {
      getWeeklyWindowUTC: sinon.stub(),
      postgresDateFormat: sinon.stub()
    };

    ReportsStub = sinon.stub().returns({
      getRecordsWithProps: sinon.stub().resolves({ data: mockHistoryData }),
      transformToAllQuestionsCsv: sinon.stub().resolves(mockCsvOutput),
      sendReport: sinon.stub().resolves('sent')
    });

    WeeklySubmittedReports = proxyquire('../../../../services/reports/weekly_submitted_reports', {
      [utilitiesPath]: utilitiesStub,
      [reportsPath]: ReportsStub
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a report of weekly submissions and return response', async () => {
    const mockStart = new Date('2025-05-12T00:00:00Z');
    const mockEnd = new Date('2025-05-18T23:59:59Z');

    utilitiesStub.getWeeklyWindowUTC.returns({ start: mockStart, end: mockEnd });
    utilitiesStub.postgresDateFormat.callsFake(date => date);

    const response = await WeeklySubmittedReports.createReport('test', logger);

    expect(utilitiesStub.getWeeklyWindowUTC.calledOnce).to.be.true;
    expect(ReportsStub.calledWith({
      type: 'test',
      tableName: 'submitted_applications',
      from: utilitiesStub.postgresDateFormat(mockStart),
      to: utilitiesStub.postgresDateFormat(mockEnd)
    })).to.be.true;
    expect(response).to.equal('sent');
  });

  it('should log an error if an exception is thrown', async () => {
    const mockError = new Error('Something went wrong');

    ReportsStub.returns({
      getRecordsWithProps: sinon.stub().rejects(mockError),
      transformToAllQuestionsCsv: sinon.stub().rejects(mockError),
      sendReport: sinon.stub().rejects(mockError)
    });

    // Provide a valid window so the error originates from Reports methods
    const mockStart = new Date('2025-05-12T00:00:00Z');
    const mockEnd = new Date('2025-05-18T23:59:59Z');
    utilitiesStub.getWeeklyWindowUTC.returns({ start: mockStart, end: mockEnd });

    await WeeklySubmittedReports.createReport('test', logger);
    expect(logger.log.calledWith('error', mockError)).to.be.true;
  });

  it('should log an error if logger is not passed', async () => {
    const mockError = new Error('Something went wrong');
    const consoleErrorStub = sinon.stub(console, 'error');

    ReportsStub.returns({
      getRecordsWithProps: sinon.stub().rejects(mockError),
      transformToAllQuestionsCsv: sinon.stub().rejects(mockError),
      sendReport: sinon.stub().rejects(mockError)
    });

    // Provide a valid window so the error originates from Reports methods
    const mockStart = new Date('2025-05-12T00:00:00Z');
    const mockEnd = new Date('2025-05-18T23:59:59Z');
    utilitiesStub.getWeeklyWindowUTC.returns({ start: mockStart, end: mockEnd });

    const fallbackLogger = {
      log: consoleErrorStub
    };

    await WeeklySubmittedReports.createReport('test', fallbackLogger);
    expect(consoleErrorStub.calledWith('error', mockError)).to.be.true;
    consoleErrorStub.restore();
  });
});
