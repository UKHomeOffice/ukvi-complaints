const proxyquire = require('proxyquire');

describe('save-file behaviour tests', () => {
  let SaveFile;
  let mockConfig;
  let mockModel;
  let req;
  let res;
  let next;
  let superclass;

  beforeEach(() => {
    mockConfig = {
      upload: {
        maxFileSizeInBytes: 5000000,
        allowedMimeTypes: ['image/jpeg', 'application/pdf'],
        documentCategories: {
          testDocument: {
            allowMultipleUploads: true,
            limit: 2,
            limitValidationError: 'maxFileError'
          }
        }
      }
    };

    mockModel = sinon.stub();
    mockModel.prototype.save = sinon.stub().resolves();
    mockModel.prototype.toJSON = sinon.stub().returns({ id: '12345' });
    SaveFile = proxyquire(
      '../../../apps/ukvi-complaints/behaviours/save-file',
      {
        '../../../config': mockConfig,
        '../models/file-upload': mockModel
      }
    );

    req = {
      files: {},
      form: { values: {} },
      sessionModel: {
        get: sinon.stub(),
        set: sinon.stub()
      },
      log: sinon.stub()
    };

    res = {
      redirect: sinon.stub()
    };

    next = sinon.stub();

    superclass = class {
      process() {}
      validateField() {}
      saveValues() {}
    };

    superclass.prototype.ValidationError = class ValidationError {
      constructor(key, options) {
        this.key = key;
        this.type = options.type;
        this.arguments = options.arguments;
      }
    };
  });
  it('should process the file and set the file', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = { name: 'test-file.pdf' };
    sinon.stub(superclass.prototype, 'process');
    instance.process(req);

    expect(req.form.values.testField).to.equal('test-file.pdf');
    expect(req.log.calledWith('info')).to.be.true;

    superclass.prototype.process.restore();
  });

  it('should validate a valid file', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 4000,
      mimetype: 'image/jpeg',
      truncated: false
    };

    req.sessionModel.get.returns([]);
    sinon.stub(superclass.prototype, 'validateField');
    const result = instance.validateField('testField', req);
    expect(result).to.be.undefined;

    superclass.prototype.validateField.restore();
  });

  it('should return validation error - oversized file', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 6000000,
      mimetype: 'image/jpeg',
      truncated: false
    };

    sinon.stub(superclass.prototype, 'validateField');

    const error = instance.validateField('testField', req);
    expect(error).to.be.instanceOf(superclass.prototype.ValidationError);
    expect(error.type).to.equal('maxFileSize');

    superclass.prototype.validateField.restore();
  });

  it('should return validation error - invalid mimetype', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 2000,
      mimetype: 'text/plain',
      truncated: false
    };

    sinon.stub(superclass.prototype, 'validateField');

    const error = instance.validateField('testField', req);
    expect(error).to.be.instanceOf(superclass.prototype.ValidationError);
    expect(error.type).to.equal('fileType');

    superclass.prototype.validateField.restore();
  });

  it('should return validation error - exceeding upload limit', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 2000,
      mimetype: 'image/jpeg',
      truncated: false
    };

    req.sessionModel.get.returns([{ id: '1' }, { id: '2' }]);

    sinon.stub(superclass.prototype, 'validateField');

    const error = instance.validateField('testField', req);
    expect(error).to.be.instanceOf(superclass.prototype.ValidationError);
    expect(error.type).to.equal('maxFileError');

    superclass.prototype.validateField.restore();
  });

  it('should return validation error - truncated file', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 2000,
      mimetype: 'image/jpeg',
      truncated: true
    };

    // check
    sinon.stub(superclass.prototype, 'validateField');

    const error = instance.validateField('testField', req);
    expect(error).to.be.instanceOf(superclass.prototype.ValidationError);
    expect(error.type).to.equal('maxFileSize');

    superclass.prototype.validateField.restore();
  });

  it('should handle multiple uploads not allowed', () => {
    mockConfig.upload.documentCategories.testDocument.allowMultipleUploads = false;
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      size: 2000,
      mimetype: 'image/jpeg',
      truncated: false
    };

    req.sessionModel.get.returns([{ id: '1' }]);

    sinon.stub(superclass.prototype, 'validateField');

    const error = instance.validateField('testField', req);
    expect(error).to.be.undefined;

    superclass.prototype.validateField.restore();
  });

  it('should successfully save the file and redirect', async () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      name: 'test-file.pdf',
      data: Buffer.from('uploaded file data'),
      mimetype: 'application/pdf'
    };

    req.sessionModel.get.returns([]);
    sinon.stub(superclass.prototype, 'saveValues');
    await instance.saveValues(req, res, next);
    expect(mockModel.prototype.save.calledOnce).to.be.true;
    expect(req.sessionModel.set.calledWith('testDocument')).to.be.true;
    expect(res.redirect.calledOnce).to.be.true;

    superclass.prototype.saveValues.restore();
  });

  it('should handle error during save - call next error', async () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    req.files.testField = {
      name: 'test-file.pdf',
      data: Buffer.from('uploaded file data'),
      mimetype: 'application/pdf'
    };

    req.sessionModel.get.returns([]);
    mockModel.prototype.save.rejects(new Error('save api error'));
    sinon.stub(superclass.prototype, 'saveValues');
    await instance.saveValues(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0].message).to.equal(
      'Failed to save document: Error: save api error'
    );

    superclass.prototype.saveValues.restore();
  });

  it('should not set the form when no file uploaded', () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    sinon.stub(superclass.prototype, 'process');
    instance.process(req);

    expect(req.form.values.testField).to.be.undefined;
    superclass.prototype.process.restore();
  });

  it('should not save a file when no file uploaded', async () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    sinon.stub(superclass.prototype, 'saveValues');
    await instance.saveValues(req, res, next);

    expect(mockModel.prototype.save.called).to.be.false;
    expect(req.sessionModel.set.called).to.be.false;
    expect(res.redirect.called).to.be.false;

    superclass.prototype.saveValues.restore();
  });

  it('should call and return super validateField', async () => {
    const Bhaviour = SaveFile('testDocument', 'testField')(superclass);
    const instance = new Bhaviour();
    sinon
      .stub(superclass.prototype, 'validateField')
      .returns('super-validation-result');
    const result = instance.validateField('testField', req);

    expect(result).to.equal('super-validation-result');
    superclass.prototype.validateField.restore();
  });
});
