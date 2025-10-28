const config = require('../../config.js');
const path = require('node:path');
const fs = require('node:fs');
const ReportsFactory = require('./index.js');
const logger = require('hof/lib/logger')({ env: config.env });

const generateReports = async () => {
  const dataDirectory = path.join(__dirname, '..', '..', config.dataDirectory);

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  try {
    await ReportsFactory.createReport('1-week-report', logger);
  } catch(e) {
    logger.info('error', e);
  }
};

// skip it for test mode, otherwise will fail unit test
if (config.env !== 'test') {
  generateReports();
}

module.exports = generateReports;
