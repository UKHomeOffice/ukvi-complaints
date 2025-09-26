const Reports = require('./reports');
const utilities = require('../../lib/utils');

module.exports = class WeeklySubmittedReports {
  static async createReport(type, logger) {
    try {
      const utcTime = utilities.getUTCTime(0);
      const sevenDaysBefore = utilities.subtractFromDate(utcTime, 7, 'days');
      const oneSecondBefore = utilities.subtractFromDate(utcTime, 1, 'second');

      const report = new Reports({
        type,
        tableName: 'submitted_applications',
        from: utilities.postgresDateFormat(sevenDaysBefore),
        to: utilities.postgresDateFormat(oneSecondBefore)
      });

      const response = await report.getRecordsWithProps({ timestamp: 'submitted_at' });

      await report.transformToAllQuestionsCsv(type, response.data);
      return await report.sendReport(type);
    } catch (e) {
      return logger.log('error', e);
    }
  }
};
