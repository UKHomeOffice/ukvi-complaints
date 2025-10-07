const sinon = require('sinon');
const { expect } = require('chai');

const WeeklySubmittedReports = require('../../../../services/reports/weekly_submitted_reports.js');
const ReportsFactory = require('../../../../services/reports');

describe('ReportsFactory', () => {
  let createReportStub;
  const logger = { info: sinon.stub() };

  beforeEach(() => {
    createReportStub = sinon.stub(WeeklySubmittedReports, 'createReport');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call WeeklySubmittedReports.createReport for "1-week-report" type', async () => {
    const fakeReport = { report: 'weekly' };
    createReportStub.resolves(fakeReport);

    const result = await ReportsFactory.createReport('1-week-report', logger);

    expect(createReportStub.calledOnceWith('1-week-report', logger)).to.be.true;
    expect(result).to.equal(fakeReport);
  });

  it('should return null for unknown report type', async () => {
    const result = await ReportsFactory.createReport('unknown-type', logger);

    expect(result).to.be.null;
    expect(createReportStub.notCalled).to.be.true;
  });
});
