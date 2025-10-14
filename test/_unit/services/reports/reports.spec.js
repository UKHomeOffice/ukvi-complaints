const chai = require('chai');
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const proxyquire = require('proxyquire').noCallThru();

'use strict';

const { expect } = chai;


describe('Reports', () => {
    let Reports, ModelStub, configStub, utilitiesStub, NotifyClientStub, loggerStub;

    beforeEach(() => {
        ModelStub = sinon.stub();
        ModelStub.prototype._request = sinon.stub();
        ModelStub.prototype.request = sinon.stub();

        NotifyClientStub = sinon.stub();
        NotifyClientStub.prototype.sendEmail = sinon.stub().resolves();

        configStub = {
            email: {
                notifyApiKey: 'test-key',
                csvReportTemplateId: 'template-id',
                csvReportEmail: 'test@email.com'
            },
            saveService: {
                protocol: 'http',
                host: 'localhost',
                port: '3000'
            },
            keycloak: {
                token: 'token-url',
                username: 'user',
                password: 'pass',
                clientId: 'client-id',
                secret: 'secret'
            },
            upload: {
                hostname: 'http://upload'
            }
        };

        utilitiesStub = {
            NotifyClient: NotifyClientStub,
            postgresDateFormat: sinon.stub().returns('2024-01-01'),
            formatDate: sinon.stub().returns('01/01/2024'),
            formatDateTime: sinon.stub().returns('01/01/2024 00:00')
        };

        loggerStub = {
            log: sinon.stub(),
            error: sinon.stub()
        };

        Reports = proxyquire('../../../../services/reports/reports', {
            hof: { model: ModelStub },
            '../../config': configStub,
            '../../lib/utils': utilitiesStub,
            winston: {
                createLogger: sinon.stub().returns(loggerStub),
                format: { combine: sinon.stub(), timestamp: sinon.stub(), json: sinon.stub() },
                transports: { Console: sinon.stub() }
            },
            lodash: require('lodash'),
            fs,
            path
        });
    });

    describe('constructor', () => {
        it('should throw error if required properties are missing', () => {
            expect(() => new Reports({})).to.throw('Please include a "tableName", "type" and "from" property');
        });

        it('should set properties correctly', () => {
            const opts = { tableName: 'table', type: 'type', from: '2024-01-01' };
            const reports = new Reports(opts);
            expect(reports.tableName).to.equal('table');
            expect(reports.type).to.equal('type');
            expect(reports.from).to.equal('2024-01-01');
            expect(reports.to).to.equal('2024-01-01');
            expect(reports.tableUrl).to.include('table');
        });
    });

    describe('auth', () => {
        it('should throw error if keycloak config is missing', async () => {
            const badConfig = { ...configStub, keycloak: {} };
            Reports = proxyquire('../../../../services/reports/reports', {
                hof: { model: ModelStub },
                '../../config': badConfig,
                '../../lib/utils': utilitiesStub,
                winston: { createLogger: sinon.stub().returns(loggerStub), format: {}, transports: {} },
                lodash: require('lodash'),
                fs,
                path
            });
            const reports = new Reports({ tableName: 't', type: 't', from: 'd' });
            await expect(reports.auth()).to.be.rejectedWith('Keycloak token is not defined');
        });

        it('should return bearer token', async () => {
            ModelStub.prototype._request.resolves({ data: { access_token: 'token123' } });
            const reports = new Reports({ tableName: 't', type: 't', from: 'd' });
            const result = await reports.auth();
            expect(result).to.deep.equal({ bearer: 'token123' });
        });
    });

    describe('getRecordsWithProps', () => {
        it('should call _request with correct params', async () => {
            ModelStub.prototype._request.resolves('records');
            const reports = new Reports({ tableName: 't', type: 't', from: 'd' });
            const result = await reports.getRecordsWithProps({ extra: 'val' });
            expect(ModelStub.prototype._request.calledOnce).to.be.true;
            expect(result).to.equal('records');
        });
    });

    describe('transformToCsv', () => {
        it('should write headings and rows to csv file', async () => {
            sinon.stub(fs, 'createWriteStream').returns({
                write: sinon.stub().callsFake((data, cb) => cb && cb()),
                on: sinon.stub(),
                end: sinon.stub().callsFake((cb) => cb && cb())
            });
            sinon.stub(path, 'join').returns('/tmp/test.csv');
            sinon.stub(fs, 'unlink').callsFake((file, cb) => cb && cb());
            const reports = new Reports({ tableName: 't', type: 't', from: 'd' });
            await reports.transformToCsv('test', ['a', 'b'], [['1', '2']]);
            fs.createWriteStream.restore();
            path.join.restore();
            fs.unlink.restore();
        });
    });

    describe('sendReport', () => {
        it('should read file and send email', async () => {
            sinon.stub(fs, 'readFile').callsFake((file, cb) => cb(null, Buffer.from('csv')));
            sinon.stub(path, 'join').returns('/tmp/test.csv');
            ModelStub.prototype.request.resolves({ url: 'http://upload/file/uuid?x=1' });
            NotifyClientStub.prototype.sendEmail.resolves();
            sinon.stub(fs, 'unlink').callsFake((file, cb) => cb && cb());
            const reports = new Reports({ tableName: 't', type: 't', from: '2024-01-01' });
            await reports.sendReport('test');
            fs.readFile.restore();
            path.join.restore();
            fs.unlink.restore();
        });

        it('should reject if file read fails', async () => {
            sinon.stub(fs, 'readFile').callsFake((file, cb) => cb(new Error('fail')));
            sinon.stub(path, 'join').returns('/tmp/test.csv');
            const reports = new Reports({ tableName: 't', type: 't', from: '2024-01-01' });
            await expect(reports.sendReport('test')).to.be.rejected;
            fs.readFile.restore();
            path.join.restore();
        });
    });
});