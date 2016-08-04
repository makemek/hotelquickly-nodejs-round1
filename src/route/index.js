'use strict';

const express = require('express');
const router = express.Router();

router.post('/pay', function(req, res) {
	res.send('hello world!');
})

module.exports = exports = router;