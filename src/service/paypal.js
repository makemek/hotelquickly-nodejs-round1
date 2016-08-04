'use strict';

const paypal = require('paypal-rest-sdk');
const paymentConfig = require('../config/payment');

paypal.configure(paymentConfig.paypal);

var Paypal = {
	/**
	 * Response from paypal sdk
	 * Example {@link https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment/create_with_credit_card.js}
	 * 
	 * @callback {requestCallback}
	 * @param {object} error
	 * @param {object} result - response from paypal sdk. Sample {@link https://developer.paypal.com/docs/api/payments/#payment_execute_response}
	 */

	/**
	 * Charge payer's money through credit card
	 * All validation tasks are delegated to paypal
	 * 
	 * @param  {object}   creditCard - credit card information
	 * @param  {number}   amount     - total amount to charge
	 * @param  {string}   currency   - an ISO 4217 currency code {@link https://en.wikipedia.org/wiki/ISO_4217}
	 * @param  {requestCallback} done - a callback function that handles the response
	 */
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