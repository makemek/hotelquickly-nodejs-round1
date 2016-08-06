'use strict';

const braintree = require('braintree');
const braintreeConfig = require('../config/payment').braintree;
const braintreeReceipt = require('../schema/braintree');

braintreeConfig.api.environment = braintree.Environment.Sandbox;
var gateway = braintree.connect(braintreeConfig.api);

var Braintree = {

	/**
	 * Response from braintree sdk
	 * @see https://developers.braintreepayments.com/guides/transactions/node
	 * 
	 * @callback {requestCallback}
	 * @param {object} error - any other error that doesn't concern with http status code 2xx and 4xx sent from the target server
	 * @param {bool} isSuccess - indicate whether the transaction is success or not
	 * @param {object} result - if transaction is successful, result.isSuccess will return true. Otherwise check for validation errors {@link https://developers.braintreepayments.com/reference/general/validation-errors/all/node}
	 */

	/**
	 * Charge payer's money through credit card
	 * All validation tasks are delegated to braintree
	 * 
	 * @param  {object}   creditCard - credit card information
	 * @param  {number}   amount     - total amount to charge
	 * @param  {string}   currency   - an ISO 4217 currency code {@link https://en.wikipedia.org/wiki/ISO_4217}
	 * @param  {requestCallback} done - a callback function that handles the response
	 */
	charge: function(creditCard, amount, currency, done) {
		
		var payment = {
			amount: amount,
			creditCard: mapCreditCardParameter(creditCard),
			merchantAccountId: associateMerchantAccount(currency),
			options: {
				submitForSettlement: true
			}
		}

		gateway.transaction.sale(payment, function(error, result){
			done(error, result.success, result);
		})
	},

	serialize: function(paymentResponse, done) {
		var receipt = new braintreeReceipt({paymentResult: paymentResponse});
		receipt.save(done);
	}
}

function mapCreditCardParameter(creditCard) {
	return {
		cardholderName: creditCard.card_holder_firstname + ' ' + creditCard.card_holder_lastname,
		cvv: creditCard.card_cvv,
		expirationMonth: creditCard.card_expire_month,
		expirationYear: creditCard.card_expire_year,
		number: creditCard.card_number
	}
}

function associateMerchantAccount(currency) {
	currency = currency.toLowerCase();
	var merchantAccount = braintreeConfig.merchantAccountId;
	if(!merchantAccount.hasOwnProperty(currency))
		return null;
	return merchantAccount[currency];
}

module.exports = exports = Braintree;