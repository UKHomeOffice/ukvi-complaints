'use strict';
<<<<<<< HEAD
=======

module.exports = superclass => class extends superclass {

	locals(req, res, next) {
		res.locals.isBehaviourIssue = req.form.values.reason === 'staff-behaviour';
		res.locals.isRefundIssue = req.form.values.reason === 'refund';
		res.locals.isApplicationIssue = req.form.values.reason === 'immigration-application';
		return super.locals(req, res, next);
	}
>>>>>>> 1bc76527f0f3a2d13da407ca959cd02d2a34f55b

module.exports = superclass => class extends superclass {
	  locals(req, res, next) {
		    res.locals.isBehaviourIssue = req.form.values.reason === 'staff-behaviour';
		    res.locals.isRefundIssue = req.form.values.reason === 'refund';
		    res.locals.isApplicationIssue = req.form.values.reason === 'immigration-application';
		    return super.locals(req, res, next);
	  }
};
