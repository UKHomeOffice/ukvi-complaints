'use strict';

module.exports = config => superclass => class extends superclass {
  process(req, res, cb) {
    const visited = req.sessionModel.get('steps');
    if (visited && visited.indexOf(req.form.options.route) > -1) {
      if (req.form.values[config.field] !== req.sessionModel.get(config.field)) {
        req.sessionModel.reset();
      }
    }
    super.process(req, res, cb);
  }
};
