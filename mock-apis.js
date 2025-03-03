'use strict';

const router = require('express').Router();

router.use('/file', require('./mocks/file-upload'));

module.exports = router;