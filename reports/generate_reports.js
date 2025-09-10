const config = require('../../config.js');
const path = require('path');
const fs = require('fs');
const ReportsFactory = require('.');
const logger = require('hof/lib/logger')({ env: config.env });

const generateReports = async () => {
  const dataDirectory = path.join(__dirname, `/../../${config.dataDirectory}`);

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  try {
    await ReportsFactory.createReport('24-hour-report', logger);
  } catch(e) {
    logger.info('error', e);
  }
};

generateReports();
module.exports = generateReports;