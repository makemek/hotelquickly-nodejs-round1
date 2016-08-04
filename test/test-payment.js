'use strict';

const paypal = require('../src/service/paypal');
const braintree = require('../src/service/braintree');

describe('payment', function() {

	var creditCard;

	beforeEach(function() {
		creditCard = {
			pay_method: 'visa',
			card_number: '4111111111111111',
			card_expire_month: '9',
			card_expire_year: '2021',
			card_cvv: '874',
			card_holder_firstname: 'Joe',
			card_holder_lastname: 'Shopper',
		}
	})

	describe('paypal', function() {
		it('valid credit card number', function(done) {
			this.timeout(50000);
			paypal.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isTrue(isSuccess);
				done();
			})
		})

		it('invalid credit card number', function(done){
			this.timeout(50000);
			creditCard.card_number = '0123456789';
			paypal.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isFalse(isSuccess);
				done();
			})
		})
	})

	describe('braintree', function() {
		it('valid credit card number', function(done) {
			this.timeout(50000);
			braintree.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);
				
				assert.isTrue(isSuccess, result.message);
				done();
			})
		})

		it('invalid credit card number', function(done){
			this.timeout(50000);
			creditCard.card_number = '0123456789';
			paypal.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isFalse(isSuccess);
				done();
			})
		})
	})
})