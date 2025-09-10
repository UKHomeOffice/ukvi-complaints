/* eslint-disable no-console */
// TO DO, change timings from daily to weekly. Fine for testing, for now

const Reports = require('./reports');
const utilities = require('../../lib/utilities');

module.exports = class DailySubmittedReports {
  static async createReport(type, logger) {
    try {
      const utcMidnight = utilities.getUTCMidnight();
      const oneDayBefore = utilities.subtractFromDate(utcMidnight, 1, 'day');
      const oneSecondBefore = utilities.subtractFromDate(utcMidnight, 1, 'second');
      const report = new Reports({
        type,
        tableName: 'submitted_applications',
        from: utilities.postgresDateFormat(oneDayBefore),
        to: utilities.postgresDateFormat(oneSecondBefore)
      });

      const response = await report.getRecordsWithProps({ timestamp: 'submitted_at'});

      await report.transformToAllQuestionsCsv(type, response.data);
      return await report.sendReport(type);
    } catch(e) {
      return logger ? logger.log('error', e) : console.error(e);
    }
  }
};