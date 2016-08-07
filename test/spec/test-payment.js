'use strict';

const PaypalService = require('paypal-rest-sdk');
const paypal = require('../../src/service/paypal');
const braintree = require('../../src/service/braintree');
const sinon = require('sinon');
const nock = require('nock');
require('../fixtures/paypal');
require('../fixtures/braintree');

[{name: 'paypal', component: paypal}, {name: 'braintree', component: braintree}]
.forEach(function(item){
	describe('common payment interface: ' + item.name, function(){
		var creditCard;

		beforeEach(function(){
			creditCard = {
				card_type: 'visa',
				card_number: '4111111111111111',
				card_expire_month: '9',
				card_expire_year: '2021',
				card_cvv: '874',
				card_holder_firstname: 'Joe',
				card_holder_lastname: 'Shopper'
			}
		})

		it('valid credit card number', function(done) {
			this.timeout(50000);
			item.component.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isTrue(isSuccess);
				assert.isDefined(result);
				done();
			})
		})

		it('invalid credit card number', function(done){
			this.timeout(50000);
			creditCard.card_number = '0123456789';
			item.component.charge(creditCard, 1, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isFalse(isSuccess);
				assert.isDefined(result);
				done();
			})
		})

		it('invalid amount', function(done){
			this.timeout(50000);
			item.component.charge(creditCard, 0, 'usd', function(error, isSuccess, result) {
				if(error)
					return done(error);

				assert.isFalse(isSuccess, 'payment should not success');
				done();
			})
		})
	})
})

describe('paypal', function() {
	it('payment total amount should be a number string with 2 decimal places', sinon.test(function() {
		var paymentStub = this.stub(PaypalService.payment, 'create');
		paypal.charge({}, 1.5, '');
		var payment = paymentStub.firstCall.args[0];

		payment.transactions.forEach(function(transaction) {
			var total = transaction.amount.total;
			assert.isString(total, 'should be a string');
			assert.match(total, /\d*\.\d{2}/, 'should have 2 decimal places');
		})
	}))
})