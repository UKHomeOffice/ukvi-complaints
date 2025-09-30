const chai = require('chai');
const sinon = require('sinon');
const WeeklySubmittedReports = require('./weekly_submitted_reports');
const Reports = require('./reports');
const utilities = require('../../lib/utils');

const { expect } = chai;


describe('WeeklySubmittedReports.createReport', () => {
    let sandbox, loggerStub, reportStub, fakeReportInstance;

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        // Stub utilities
        sandbox.stub(utilities, 'getUTCTime').returns('fake-utc');
        sandbox.stub(utilities, 'subtractFromDate')
            .onFirstCall().returns('seven-days-before')
            .onSecondCall().returns('one-second-before');
        sandbox.stub(utilities, 'postgresDateFormat')
            .onFirstCall().returns('from-date')
            .onSecondCall().returns('to-date');

        // Stub Reports instance methods
        fakeReportInstance = {
            getRecordsWithProps: sandbox.stub().resolves({ data: 'fake-data' }),
            transformToAllQuestionsCsv: sandbox.stub().resolves(),
            sendReport: sandbox.stub().resolves('report-sent')
        };

        // Stub Reports constructor
        reportStub = sandbox.stub(Reports.prototype, 'constructor').returns(fakeReportInstance);
        sandbox.stub(Reports.prototype, 'getRecordsWithProps').callsFake(fakeReportInstance.getRecordsWithProps);
        sandbox.stub(Reports.prototype, 'transformToAllQuestionsCsv').callsFake(fakeReportInstance.transformToAllQuestionsCsv);
        sandbox.stub(Reports.prototype, 'sendReport').callsFake(fakeReportInstance.sendReport);

        // Stub logger
        loggerStub = { log: sandbox.stub() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a report and send it successfully', async () => {
        const result = await WeeklySubmittedReports.createReport('weekly', loggerStub);

        expect(utilities.getUTCTime.calledWith(7)).to.be.true;
        expect(utilities.subtractFromDate.firstCall.calledWith('fake-utc', 7, 'days')).to.be.true;
        expect(utilities.subtractFromDate.secondCall.calledWith('fake-utc', 1, 'second')).to.be.true;
        expect(utilities.postgresDateFormat.firstCall.calledWith('seven-days-before')).to.be.true;
        expect(utilities.postgresDateFormat.secondCall.calledWith('one-second-before')).to.be.true;

        expect(fakeReportInstance.getRecordsWithProps.calledWith({ timestamp: 'submitted_at' })).to.be.true;
        expect(fakeReportInstance.transformToAllQuestionsCsv.calledWith('weekly', 'fake-data')).to.be.true;
        expect(fakeReportInstance.sendReport.calledWith('weekly')).to.be.true;
        expect(result).to.equal('report-sent');
    });

    it('should log and return error if exception is thrown', async () => {
        fakeReportInstance.getRecordsWithProps.rejects(new Error('fail'));
        const result = await WeeklySubmittedReports.createReport('weekly', loggerStub);

        expect(loggerStub.log.calledOnce).to.be.true;
        expect(loggerStub.log.firstCall.args[0]).to.equal('error');
        expect(loggerStub.log.firstCall.args[1]).to.be.an('error');
        expect(result).to.be.undefined;
    });
});