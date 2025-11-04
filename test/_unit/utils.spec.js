'use strict';
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const configPath = require.resolve('../../config.js');

describe('utils', () => {
  let utils;
  let createSub;
  let sendStub;
  const testSchema = {
    test: 'schema'
  };

  const testUuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
  const validComplaintData = {
    creationDate: '2021-03-17',
    complaint: {
      reporterDetails: {
        applicantType: 'AGENT',
        applicantDetails: {
          applicantName: 'pp',
          applicantNationality: 'Ukraine',
          applicantDob: '1980-02-02'
        },
        agentDetails: {
          agentName: 'mm',
          agentType: 'LEGAL_REP',
          agentEmail: 'test@test.com',
          agentPhone: '12435667889'
        }
      },
      complaintDetails: {
        complaintText: 'test',
        applicationLocation: 'INSIDE_UK',
        problemExperienced: 'TECHNICAL_ISSUES'
      },
      reference: {
        referenceType: 'GWF_REF', reference: 'GWF012345678'
      },
      complaintType: 'SUBMITTING_APPLICATION'
    }
  };

  const invalidComplaintData = {
    invalid: 'schema'
  };


  beforeEach(() => {
    sendStub = sinon.stub().resolves();
    sendStub.withArgs({
      id: testUuid,
      body: JSON.stringify(invalidComplaintData)
    }).rejects();
    createSub = sinon.stub().returns({
      send: sendStub
    });

    utils = proxyquire('../../lib/utils', {
      'sqs-producer': {
        Producer: {
          create: createSub
        }
      },
      './schema/decs.json': testSchema
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#validateAgainstSchema', () => {
    let testValidator;
    let validateStub;

    beforeEach(() => {
      validateStub = sinon.stub();
      validateStub.withArgs(validComplaintData, testSchema).returns({
        errors: []
      });
      validateStub.withArgs(invalidComplaintData, testSchema).returns({
        errors: [
          'validation error'
        ]
      });

      testValidator = {
        validate: validateStub
      };
    });

    it('returns true if the complaintData object fits the schema', () => {
      expect(utils.validAgainstSchema(validComplaintData, testValidator)).to.eql(true);
    });

    it('calls validate method on the validator once', () => {
      utils.validAgainstSchema(validComplaintData, testValidator);

      expect(validateStub).to.have.been.calledOnceWith(validComplaintData, testSchema);
    });

    it('throws an error if the complaintData object does not fit the schema', () => {
      expect(() => utils.validAgainstSchema(invalidComplaintData, testSchema)).to.throw();
    });
  });

  describe('#sendToQueue', () => {
    it('calls create on the sqs producer with SQS parameters', () => {
      utils.sendToQueue(validComplaintData, testUuid);
      expect(createSub).to.have.been.calledOnceWith({
        queueUrl: 'http://localhost:9324/queue/first-queue',
        region: 'eu-west-2',
        accessKeyId: 'stub',
        secretAccessKey: 'stub'
      });
    });

    it('calls send on sqs producer with a unique id and stringifyed complaint data', () => {
      utils.sendToQueue(validComplaintData, testUuid);
      expect(sendStub).to.have.been.calledOnceWith(
        [
          {
            id: testUuid,
            body: JSON.stringify(validComplaintData)
          }
        ]
      );
    });

    it('rejects if send fails', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(utils.sendToQueue(invalidComplaintData)).to.be.rejected;
    });
  });

  describe('parseDocumentList tests', () => {
    it('should return empty string - input non array', () => {
      expect(utils.parseDocumentList('not-array')).to.be.equal('');
    });

    it('should return empty string - input empty array', () => {
      expect(utils.parseDocumentList([])).to.be.equal('');
    });

    it('should return formatted result - input document info', () => {
      const docs = [
        { name: 'doc1.pdf', url: 'http://doc1-url' },
        { name: 'doc2.pdf', url: 'http://doc2-url' }
      ];
      const result = utils.parseDocumentList(docs);
      expect(result).to.contain('[doc1.pdf](http://doc1-url)');
      expect(result).to.contain('[doc2.pdf](http://doc2-url)');
    });

    describe('formatDateTime', () => {
      it('should format a date string to "DD/MM/YYYY HH:mm:ss" using config', () => {
        const dateStr = '2021-03-17T15:04:05Z';
        const date = new Date(dateStr);
        // Use config-based formatting
        const expectedDate = date.toLocaleDateString('en-GB', configPath.reportDateFormat);
        const expectedTime = date.toLocaleTimeString('en-GB', configPath.reportTimeFormat);
        const formatted = utils.formatDateTime(dateStr);
        expect(formatted).to.equal(`${expectedDate} ${expectedTime}`);
      });

      it('should format a Date object correctly using config', () => {
        const date = new Date(2022, 0, 2, 3, 4, 5); // Jan 2, 2022, 03:04:05 local
        const expectedDate = date.toLocaleDateString('en-GB', configPath.reportDateFormat);
        const expectedTime = date.toLocaleTimeString('en-GB', configPath.reportTimeFormat);
        const formatted = utils.formatDateTime(date);
        expect(formatted).to.equal(`${expectedDate} ${expectedTime}`);
      });
    });

    describe('postgresDateFormat', () => {
      it('should format a date to "YYYY-MM-DD HH:mm:ss" in UTC', () => {
        const date = new Date(Date.UTC(2023, 4, 6, 12, 34, 56)); // May 6, 2023, 12:34:56 UTC
        const formatted = utils.postgresDateFormat(date);
        expect(formatted).to.equal('2023-05-06 12:34:56');
      });
    });

    describe('getUTCTime', () => {
      it('should return a Date object at the given hour UTC', () => {
        const baseDate = new Date(Date.UTC(2022, 7, 15, 10, 30, 0)); // Aug 15, 2022, 10:30 UTC
        const result = utils.getUTCTime(5, baseDate);
        expect(result.getUTCFullYear()).to.equal(2022);
        expect(result.getUTCMonth()).to.equal(7);
        expect(result.getUTCDate()).to.equal(15);
        expect(result.getUTCHours()).to.equal(5);
        expect(result.getUTCMinutes()).to.equal(0);
        expect(result.getUTCSeconds()).to.equal(0);
      });

      it('should throw if hour is not provided', () => {
        expect(() => utils.getUTCTime()).to.throw('Invalid date object - an hour is required');
      });
    });

    describe('subtractFromDate', () => {
      it('should subtract seconds from a date', () => {
        const date = new Date(2023, 0, 1, 0, 0, 10); // Jan 1, 2023, 00:00:10
        const result = utils.subtractFromDate(date, 5, 'seconds');
        expect(result.getSeconds()).to.equal(5);
      });

      it('should subtract days from a date', () => {
        const date = new Date(2023, 0, 10); // Jan 10, 2023
        const result = utils.subtractFromDate(date, 3, 'days');
        expect(result.getDate()).to.equal(7);
      });

      it('should subtract using singular unit names', () => {
        const date = new Date(2023, 0, 10, 0, 0, 10);
        const result = utils.subtractFromDate(date, 10, 'second');
        expect(result.getSeconds()).to.equal(0);

        const date2 = new Date(2023, 0, 10);
        const result2 = utils.subtractFromDate(date2, 1, 'day');
        expect(result2.getDate()).to.equal(9);
      });
    });
  });

  describe('NotifyMock', () => {
    const { NotifyClient } = proxyquire('../../lib/utils', {
      '../config': {
        email: {
          notifyApiKey: 'USE_MOCK'
        }
      },
      'notifications-node-client': {
        NotifyClient: sinon.stub()
      }
    });

    it('should resolve when sendEmail is called', async () => {
      const client = new NotifyClient();
      await expect(client.sendEmail()).to.eventually.be.undefined;
    });
  });

  describe('generateErrorMsg tests', () => {
    it('Returns a full message when the error object has all properties', () => {
      const mockError = {
        message: 'Some error',
        response: {
          status: 401,
          data: {
            item1: 'one',
            item2: 'two'
          }
        }
      };

      const result = utils.generateErrorMsg(mockError);
      expect(result).to.equal('401 -Some error; Cause: {"item1":"one","item2":"two"}');
    });

    it('Returns a shorter message when the error object does not contain data', () => {
      const mockError = {
        message: 'Some error',
        response: {
          status: 401
        }
      };

      const result = utils.generateErrorMsg(mockError);
      expect(result).to.equal('401 -Some error');
    });

    it('Returns error.message only when no response prop is present in the error object', () => {
      const mockError = {
        message: 'Some error'
      };

      const result = utils.generateErrorMsg(mockError);
      expect(result).to.equal('Some error');
    });
  });

  describe('sanitiseCsvValue', () => {
    it('should quote values with commas', () => {
      const result = utils.sanitiseCsvValue('apple, banana');
      expect(result).to.equal('"apple, banana"');
    });

    it('should quote values with newlines, carriage returns, or quotes', () => {
      const result = utils.sanitiseCsvValue('line1\nline2\rline3\tline4');
      expect(result).to.equal('"line1\nline2\rline3\tline4"');
    });

    it('should replace curly quotes with straight quotes (if not quoted)', () => {
      const result = utils.sanitiseCsvValue('It’s ‘fine’');
      expect(result).to.equal("It's 'fine'");
    });

    it('should return non-string values unchanged', () => {
      expect(utils.sanitiseCsvValue(123)).to.equal(123);
      expect(utils.sanitiseCsvValue(null)).to.equal(null);
      expect(utils.sanitiseCsvValue(undefined)).to.equal(undefined);
      expect(utils.sanitiseCsvValue(['a', 'b'])).to.deep.equal(['a', 'b']);
    });

    it('should handle combined cases correctly', () => {
      const input = '‘Hello’,\nworld\tIt’s fine';
      const expected = '"‘Hello’,\nworld\tIt’s fine"';
      expect(utils.sanitiseCsvValue(input)).to.equal(expected);
    });
  });
});
