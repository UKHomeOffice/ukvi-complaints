'use strict';
process.env.AWS_REGION = 'eu-west-2';
process.env.SQS_URL = 'http://localhost:9324/queue/first-queue';
process.env.AWS_ACCESS_KEY_ID = 'stub';
process.env.AWS_SECRET_ACCESS_KEY = 'stub';
process.env.NOTIFY_KEY = 'stub';

global.chai = require('chai');
global.expect = chai.expect;
global.reqres = require('hof').utils.reqres;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised.default || chaiAsPromised);
chai.use(sinonChai.default || sinonChai);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
