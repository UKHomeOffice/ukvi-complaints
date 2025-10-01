'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const generateReports = require('../../../../services/reports/generate_reports.js');
const path = require('path');
const fs = require('fs');
const config = require('../../../../config.js');

const logger = require('../../../../node_modules/hof/lib/logger');
const reportIndex = require('../../../../services/reports/index.js');

describe('generateReports', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Stub external dependencies
    sandbox.stub(fs, 'existsSync');
    sandbox.stub(fs, 'mkdirSync');
    sandbox.stub(path, 'join');
    sandbox.stub(logger, 'info');
    sandbox.stub(reportIndex, 'createReport').resolves('mocked report');

    config.dataDirectory = '/data';
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a data directory if it does not exist', async () => {
    fs.existsSync.returns(false);
    path.join.returns('/mock/path/to/data');

    await generateReports();

    expect(fs.existsSync.calledWith('/mock/path/to/data')).to.be.true;
    expect(fs.mkdirSync.calledWith('/mock/path/to/data')).to.be.true;
  });
});
