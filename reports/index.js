const WeeklySubmittedReports = require('./weekly_submitted_reports');

module.exports = class ReportsFactory {
  static async createReport(type, logger) {
    switch(type) {
      case '1-week-report':
        return await WeeklySubmittedReports.createReport(type, logger);
    }
    return null;
  }
};
