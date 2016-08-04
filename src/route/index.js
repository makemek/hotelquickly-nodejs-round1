'use strict';

const express = require('express');
const router = express.Router();
const gatewayRoutingTable = require('../config/gateway');
const Gateway = require('../service/');
const gateway = new Gateway(gatewayRoutingTable);

router.post('/pay', function(req, res) {
	res.send('hello world!');
})

module.exports = exports = router;