'use strict';

const paypal = require('../src/service/paypal');

describe('paypal payment', function() {

	var creditCard;

	beforeEach(function() {
		creditCard = {
			pay_method: 'visa',
			card_number: '4032032030095639',
			card_expire_month: '9',
			card_expire_year: '2021',
			card_cvv: '874',
			card_holder_firstname: 'Joe',
			card_holder_lastname: 'Shopper',
		}
	})

	it('valid credit card', function(done) {
		this.timeout(50000);
		paypal.charge(creditCard, 1, 'usd', function(error, payment) {
			if(error)
				return done(error);

			done();
		})
	})

	it('invalid credit card number', function(done){
		this.timeout(50000);
		creditCard.card_number = '0123456789';
		paypal.charge(creditCard, 1, 'usd', function(error, payment) {
			assert.isDefined(error);
			assert.isNull(payment);

			assert.equal(error.httpStatusCode, 400);
			done();
		})
	})

})