const Reports = require('./reports');
const utilities = require('hof/utilities');

module.exports = class WeeklySubmittedReports {
  static async createReport(type, logger) {
    try {
      const utcMidnight = utilities.getUTCMidnight();
      const sevenDaysBefore = utilities.subtractFromDate(utcMidnight, 7, 'days');
      const oneSecondBefore = utilities.subtractFromDate(utcMidnight, 1, 'second');

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
