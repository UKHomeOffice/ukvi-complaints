'use strict';

const DateController = sinon.stub();
const ComplaintDateController = require('proxyquire')('../../../../../apps/complaints/controllers/complaint-date', {
  'hof-controllers': {
    date: DateController
  }
});

describe('apps/complaints/controllers/complaint-date', () => {

  describe('instantiated', () => {

    const args = {template: 'index'};

    beforeEach(() => {
      // eslint-disable-next-line no-new
      new ComplaintDateController(args);
    });

    it('calls DateController with the arguments', () => {
      DateController.should.have.been.calledWith(args);
    });

  });

  describe('process', () => {

    describe('with all date parts', () => {
      const req = {
        form: {
          values: {
            'complaint-date-day': '01',
            'complaint-date-month': '01',
            'complaint-date-year': '2015'
          }
        }
      };
      let callback;
      let controller;
      const args = {template: 'index'};

      beforeEach(() => {
        callback = sinon.stub();
        controller = new ComplaintDateController(args);
        controller.dateKey = 'complaint-date';
        controller.options = {};
        controller.options.dateFormat = 'DD-MM-YYYY';
        controller.process(req, {}, callback);
      });

      it('creates a date field', () => {
        req.form.values['complaint-date'].should.equal('01-01-2015');
      });

      it('calls callback', () => {
        callback.should.have.been.called;
      });

    });

    describe('with month and year date parts', () => {
      const req = {
        form: {
          values: {
            'complaint-date-day': '',
            'complaint-date-month': '01',
            'complaint-date-year': '2015'
          }
        }
      };
      let callback;
      let controller;
      const args = {template: 'index'};

      beforeEach(() => {
        callback = sinon.stub();
        controller = new ComplaintDateController(args);
        controller.dateKey = 'complaint-date';
        controller.options = {};
        controller.options.dateFormat = 'DD-MM-YYYY';
        controller.process(req, {}, callback);
      });

      it('creates a date field', () => {
        req.form.values['complaint-date'].should.equal('01-01-2015');
      });

      it('calls callback', () => {
        callback.should.have.been.called;
      });

    });
  });
});
