'use strict';

const RemoveDocumentBehaviour = require('../../../apps/ukvi-complaints/behaviours/remove-file');

describe('Tests for Remove Document Behaviour', () => {
  class Base {
    constructor() {}
    configure() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  const documents = [
    {
      name: 'test.pdf',
      mimetype: 'application/pdf',
      id: 'doc1',
      url: 'http:/s3-url'
    }
  ];

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe('Configure tests', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'configure').returns(req, res, next);
      instance = new (RemoveDocumentBehaviour('passport')(Base))();
    });

    it('init - configure', () => {
      instance.configure(req, res, next);
      expect(Base.prototype.configure).to.have.been.called;
      expect(req.sessionModel.get('passport'));
    });

    it('Should remove the given document', () => {
      req.sessionModel.set('passport', documents);
      req.query.delete = documents[0].id;
      instance.configure(req, res, next);
      const remainingDocs = req.sessionModel.get('passport');
      remainingDocs.map(image => {
        expect(image.id).to.not.equal(documents[0].id);
      });
    });

    it('Should redirect after removing the document', () => {
      req.sessionModel.set('passport', documents);
      req.query.delete = documents[0].id;
      instance.configure(req, res, next);
      expect(res.redirect).to.be.called;
    });
    afterEach(() => {
      Base.prototype.configure.restore();
    });
  });
});
