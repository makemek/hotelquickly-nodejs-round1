'use strict';

const paypal = require('paypal-rest-sdk');
const paymentConfig = require('../config/payment');

paypal.configure(paymentConfig.paypal);

var Paypal = {
	charge: function(creditCard, amount, currency, done) {
		var card = mapCreditcardToPaypalFormat(creditCard);
		var order = createTransaction(amount, currency);
		var payment = {
			intent: 'sale',
			payer: {
				payment_method: 'credit_card',
				funding_instruments: [card]
			},
			transactions: [order]
		}

		paypal.payment.create(payment, done);
	}
}

function mapCreditcardToPaypalFormat(creditCard) {
	return {
		credit_card: {
			type: creditCard.pay_method,
			number: creditCard.card_number,
			expire_month: creditCard.card_expire_month,
			expire_year: creditCard.card_expire_year,
			cvv2: creditCard.card_cvv,
			first_name: creditCard.card_holder_firstname,
			last_name: creditCard.card_holder_lastname
		}
	}
}

function createTransaction(price, currency) {
	return {
		amount: {
			total: price,
			currency: currency.toUpperCase()
		}
	}
}

module.exports = exports = Paypal;