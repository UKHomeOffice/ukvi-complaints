'use strict';

global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));
