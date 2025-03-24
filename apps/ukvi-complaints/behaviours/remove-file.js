'use strict';

module.exports = documentName => superclass =>
  class extends superclass {
    configure(req, res, next) {
      if (req.query.delete) {
        const documents = req.sessionModel.get(documentName) || [];
        const remaining = documents.filter(d => d.id !== req.query.delete);
        req.log('info', `Removing document: ${req.query.delete}`);
        req.sessionModel.set(documentName, remaining);
        return res.redirect(`${req.baseUrl}${req.path}`);
      }
      return super.configure(req, res, next);
    }
  };
