'use strict';

global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
