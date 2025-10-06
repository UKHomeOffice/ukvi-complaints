'use strict';

const { expect } = require('chai');
const sinon = require('sinon');
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
      getUTCTime: sinon.stub(),
      subtractFromDate: sinon.stub(),
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

  it('should create a report of daily submissions and return response', async () => {
    const mockUtc = '2025-05-19T00:00:00Z';
    const mockOneWeekBefore = '2025-05-12T00:00:00Z';
    const mockOneSecondBefore = '2025-05-18T23:59:59Z';

    utilitiesStub.getUTCTime.returns(mockUtc);
    utilitiesStub.subtractFromDate.withArgs(mockUtc, 7, 'day').returns(mockOneWeekBefore);
    utilitiesStub.subtractFromDate.withArgs(mockUtc, 1, 'second').returns(mockOneSecondBefore);
    utilitiesStub.postgresDateFormat.callsFake(date => date);

    const response = await WeeklySubmittedReports.createReport('test', logger);

    expect(utilitiesStub.getUTCTime.calledOnce).to.be.true;
    expect(utilitiesStub.subtractFromDate.calledWith(mockUtc, 7, 'day')).to.be.true;
    expect(utilitiesStub.subtractFromDate.calledWith(mockUtc, 1, 'second')).to.be.true;
    expect(ReportsStub.calledWith({
      type: 'test',
      tableName: 'submitted_applications',
      from: mockOneWeekBefore,
      to: mockOneSecondBefore
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

    await WeeklySubmittedReports.createReport('test');
    expect(consoleErrorStub.calledWith(mockError)).to.be.true;

    consoleErrorStub.restore();
  });
});
