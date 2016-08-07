'use strict';

const validator = require('validator');
const express = require('express');
const router = express.Router();
const gatewayRoutingTable = require('../config/gateway');
const Gateway = require('../service/');
const gateway = new Gateway(gatewayRoutingTable);

/**
 * HTTP POST
 * Process credit card payment
 *
 * Input:
 * - price <number>                : total amount
 * - currency <string>             : currency unit
 * - fullname <string>             : full customer's name
 * - card_type <string>            : type of credit card
 * - card_number <string>          : credit card number
 * - card_expire_month <number>    : credit card expiration month
 * - card_expire_year <number>     : credit card expiration year
 * - card_holder_firstname <string>: credit card holder's first name
 * - card_holder_lastname <string> : credit card holder's last name
 * 
 * Output: JSON response indicate whether payment is success or not. If success, reponse with http status code 200. 400 otherwise
 */
router.post('/pay', function(req, res, next) {
	var field = req.body;
	var isValid = validateInput(field);
	if(!isValid)
		return res.status(400).json({message: 'Invalid input'});

	var paymentService = gateway.transact(field.card_type, field.currency);
	if(paymentService instanceof Error)
		return res.status(400).json({message: paymentService.message});

	paymentService.charge(field, parseFloat(field.price), field.currency, function(error, isSuccess, result) {
		if(error)
			return next(error);

		if(!isSuccess)
			return res.status(400).json({message: 'payment failed', errorResponse: result});

		paymentService.persist(result).catch(next);
		return res.status(200).json({message: 'payment success', result});
	})

	function sanitizeInput(fields){
		Object.keys(fields).forEach(function(fieldName) {
			fields[fieldName] = fields[fieldName].trim();
		})

		return fields;
	}

	function validateInput(fields){
		fields = sanitizeInput(fields);
		var isValid = true;
		var rules = [
			fields.hasOwnProperty('price')                && parseFloat(fields.price) !== NaN,
			fields.hasOwnProperty('currency')             && /[a-zA-Z]{3}/.test(fields.currency) && fields.currency.length == 3,
			fields.hasOwnProperty('card_type')            && /\w+/.test(fields.card_type),
			fields.hasOwnProperty('card_number')          && validator.isCreditCard(fields.card_number),
			fields.hasOwnProperty('card_expire_month')    && validator.isInt(fields.card_expire_month, {min: 1, max: 12, allow_leading_zeros: true}),
			fields.hasOwnProperty('card_expire_year')     && validator.isInt(fields.card_expire_year, {allow_leading_zeros: true}),
			fields.hasOwnProperty('card_holder_firstname')&& /\w+/g.test(fields.card_holder_firstname),
			fields.hasOwnProperty('card_holder_lastname') && /\w+/g.test(fields.card_holder_lastname)
		]
		rules.forEach(function(rule) {
			isValid = isValid & rule;
		})

		return isValid;
	}
})


module.exports = exports = router;