const config = require('../../config.js');
const path = require('path');
const fs = require('fs');
const ReportsFactory = require('./index.js');
const logger = require('hof/lib/logger')({ env: config.env });

const generateReports = async () => {
  console.log('Starting report generation');
  const dataDirectory = path.join(__dirname, `/../../${config.dataDirectory}`);

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  try {
    await ReportsFactory.createReport('1-week-report', logger);
  } catch(e) {
    logger.info('error', e);
  }
};

generateReports();
module.exports = generateReports;
