const chai = require('chai');
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const proxyquire = require('proxyquire').noCallThru();

'use strict';

const expect = chai.expect;

describe('Reports', () => {
    let Reports, configStub, utilsStub, ModelStub, NotifyClientStub, winstonStub, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        configStub = {
            email: {
                notifyApiKey: 'notify-key',
                csvReportTemplateId: 'template-id',
                caseworkerEmail: 'sas-hof-test@digital.homeoffice.gov.uk'
            },
            saveService: {
                host: 'http://localhost',
                port: '3000'
            },
            keycloak: {
                token: 'token-url',
                username: 'user',
                password: 'pass',
                clientId: 'client',
                secret: 'secret'
            },
            upload: {
                hostname: 'http://upload'
            }
        };

        utilsStub = {
            NotifyClient: sinon.stub(),
            postgresDateFormat: sinon.stub().returns('2024-01-01'),
            formatDate: sinon.stub().returns('01/01/2024'),
            formatDateTime: sinon.stub().returns('01/01/2024 00:00')
        };

        NotifyClientStub = sinon.stub().returns({
            sendEmail: sinon.stub().resolves()
        });

        ModelStub = function () {};
        ModelStub.prototype._request = sinon.stub().resolves({ data: { access_token: 'token' } });
        ModelStub.prototype.request = sinon.stub().resolves({ url: 'http://upload/file/uuid?foo=bar' });

        winstonStub = {
            createLogger: sinon.stub().returns({
                log: sinon.stub(),
                error: sinon.stub()
            }),
            format: {
                combine: sinon.stub(),
                timestamp: sinon.stub(),
                json: sinon.stub()
            },
            transports: {
                Console: sinon.stub()
            }
        };

        Reports = proxyquire('../../../../services/reports/reports', {
            '../../config': configStub,
            '../../lib/utils': Object.assign({}, utilsStub, { NotifyClient: NotifyClientStub }),
            'hof': { model: ModelStub },
            'winston': winstonStub,
            'lodash': require('lodash'),
            'fs': fs,
            'path': path
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should throw if required options are missing', () => {
            expect(() => new Reports({})).to.throw();
            expect(() => new Reports({ tableName: 'foo', from: 'bar' })).to.throw();
        });

        it('should set properties correctly', () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            expect(report.tableName).to.equal('foo');
            expect(report.from).to.equal('2024-01-01');
            expect(report.type).to.equal('bar');
            expect(report.to).to.equal('2024-01-01');
        });
    });

    describe('auth', () => {
        it('should throw if keycloak config is missing', async () => {
            delete configStub.keycloak.token;
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            try {
                await report.auth();
                throw new Error('Should not reach here');
            } catch (err) {
                expect(err.message).to.match(/Keycloak token is not defined/);
            }
        });

        it('should return bearer token', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const result = await report.auth();
            expect(result).to.have.property('bearer', 'token');
        });
    });

    describe('getRecordsWithProps', () => {
        it('should call Model._request with correct params', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const modelStub = sinon.stub(ModelStub.prototype, '_request').resolves('records');
            const result = await report.getRecordsWithProps({ extra: 'val' });
            expect(modelStub.calledOnce).to.be.true;
            expect(result).to.equal('records');
            modelStub.restore();
        });
    });

    describe('transformToCsv', () => {
        it('should write headings and rows to a csv file', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const writeStreamStub = {
                write: sinon.stub().resolves(),
                on: sinon.stub(),
                end: sinon.stub().callsFake(cb => cb && cb())
            };
            sandbox.stub(fs, 'createWriteStream').returns(writeStreamStub);
            sandbox.stub(report, '#deleteFile').resolves();

            await report.transformToCsv('testfile', ['a', 'b'], [['1', '2'], ['3', '4']]);
            expect(writeStreamStub.write.called).to.be.true;
            expect(writeStreamStub.end.called).to.be.true;
        });
    });

    describe('sendReport', () => {
        it('should read file, upload, send email, and delete file', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const filePath = path.join(__dirname, '../../../../data/testfile.csv');
            sandbox.stub(fs, 'readFile').yields(null, Buffer.from('csv'));
            sandbox.stub(report, 'auth').resolves({ bearer: 'token' });
            sandbox.stub(report, '#deleteFile').resolves();

            // Patch NotifyClient
            report.notifyClient = { sendEmail: sinon.stub().resolves() };

            await report.sendReport('testfile');
            expect(fs.readFile.calledOnce).to.be.true;
        });

        it('should reject if file read fails', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            sandbox.stub(fs, 'readFile').yields(new Error('fail'));
            try {
                await report.sendReport('testfile');
                throw new Error('Should not reach here');
            } catch (err) {
                expect(err.message).to.equal('fail');
            }
        });
    });

    describe('#addQueries', () => {
        it('should add query params to url', () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const url = report['#addQueries']('http://domain', { a: 1, b: 2 });
            expect(url).to.include('a=1');
            expect(url).to.include('b=2');
        });
    });

    describe('#deleteFile', () => {
        it('should call fs.unlink and not call callback on ENOENT', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const unlinkStub = sandbox.stub(fs, 'unlink').callsFake((file, cb) => cb({ code: 'ENOENT' }));
            const cb = sinon.stub();
            await report['#deleteFile']('file', cb);
            expect(cb.called).to.be.false;
        });

        it('should call callback on other errors', async () => {
            const report = new Reports({ tableName: 'foo', from: '2024-01-01', type: 'bar' });
            const unlinkStub = sandbox.stub(fs, 'unlink').callsFake((file, cb) => cb({ code: 'EACCES' }));
            const cb = sinon.stub();
            await report['#deleteFile']('file', cb);
            expect(cb.calledOnce).to.be.true;
        });
    });
});