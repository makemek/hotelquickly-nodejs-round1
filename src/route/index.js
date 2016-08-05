'use strict';

const express = require('express');
const router = express.Router();
const gatewayRoutingTable = require('../config/gateway');
const Gateway = require('../service/');
const gateway = new Gateway(gatewayRoutingTable);

router.post('/pay', function(req, res, next) {
	var field = req.body;
	var paymentService = gateway.transact(field.card_type, field.currency);
	if(paymentService instanceof Error)
		return res.status(400).json({message: paymentService.message});

	paymentService.charge(field, field.price, field.currency, function(error, isSuccess, result) {
		if(error)
			return next(error);

		if(!isSuccess)
			return res.status(400).json({message: 'payment failed', errorResponse: result});

		return res.status(200).json({message: 'payment success', result});
	})
})

module.exports = exports = router;