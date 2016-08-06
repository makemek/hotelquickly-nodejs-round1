'use strict';

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	paymentResult: Object
});

module.exports = exports = mongoose.model('paypal', schema);
