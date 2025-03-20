'use strict';

const SaveDocumentBehaviour = require('../../../apps/ukvi-complaints/behaviours/save-file');

describe('Test for Save Document Behaviour', () => {
  class Base {
    process() {}
    locals() {}
    saveValues() {}
  }

  let req;
  let res;
  let next;

  let instance;

  const doc = {
    document: {
      name: 'test.pdf',
      encoding: '7bit',
      mimetype: 'pdf',
      truncated: false,
      size: 123456
    }
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = doc;
  });

  describe('Process file tests', () => {
    before(() => {
      sinon.stub(Base.prototype, 'process');
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('should be called ', () => {
      instance.process(req);
      expect(Base.prototype.process).to.have.been.called;
    });

    it('Should attach the given file', () => {
      const updatedDoc = {
        'file-upload': {
          name: 'test.pdf',
          encoding: '7bit',
          mimetype: 'pdf',
          truncated: false,
          size: 123456
        }
      };
      req.files = updatedDoc;
      instance.process(req);
      expect(req.files).to.eql(updatedDoc);
    });

    after(() => {
      Base.prototype.process.restore();
    });
  });

  describe('Save file locals tests', () => {
    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('init - locals', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).to.have.been.called;
    });
  });

  describe('Save values tests', () => {
    before(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('init - saveValues', () => {
      const updatedDoc = {
        'file-upload': {
          name: 'test.pdf',
          encoding: '7bit',
          mimetype: 'pdf',
          truncated: false,
          size: 123456
        }
      };
      req.files = updatedDoc;
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues.called).to.be.false;
    });

    it('Should save the file in the session model', () => {
      req.sessionModel.set('documentName', doc);
      instance.saveValues(req, res, next);
      const sessionModel = req.sessionModel.get('documentName');
      expect(sessionModel.document.name).to.eql('test.pdf');
    });

    it('should redirect to current route after upload', () => {
      req.form.options.route = '/test-route';
      req.sessionModel.set('documentName', doc);
      instance.saveValues(req, res, next);
      expect(req.form.options.route).to.eql('/test-route');
    });

    after(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
