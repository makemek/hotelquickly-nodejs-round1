'use strict';

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	orderData: Object,
	payment: Object
});

module.exports = exports = mongoose.model('braintree', schema);
