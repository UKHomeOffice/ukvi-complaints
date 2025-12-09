const Reports = require('./reports');
const utilities = require('../../lib/utils');

module.exports = class WeeklySubmittedReports {
  static async createReport(type, logger) {
    try {
      // Calculate window using shared helper: 00:00 Saturday -> 23:59:59 Friday (last week)
      const { start: windowStart, end: windowEnd } = utilities.getWeeklyWindowUTC();

      const report = new Reports({
        type,
        tableName: 'submitted_applications',
        from: utilities.postgresDateFormat(windowStart),
        to: utilities.postgresDateFormat(windowEnd)
      });

      const response = await report.getRecordsWithProps({ timestamp: 'submitted_at' });

      await report.transformToAllQuestionsCsv(type, response.data);
      return await report.sendReport(type);
    } catch (e) {
      return logger.log('error', e);
    }
  }
};
