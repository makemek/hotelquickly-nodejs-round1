'use strict';

const async = require('async');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../src/app');
const nock = require('nock');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


describe('gateway <-> payment service', function() {
	it('valid input', function(done) {
		var input = {
			price: '1',
			currency: ' USD ',
			fullname: ' Joe Shopper ',
			card_type: ' visa ',
			card_number: ' 4111111111111111 ',
			card_expire_month: ' 9 ',
			card_expire_year: ' 2021 ',
			card_holder_firstname: ' Joe ',
			card_holder_lastname: ' Shopper ',
			card_cvv: '874'
		};

		request(app)
		.post('/pay')
		.send(input)
		.expect(200)
		.end(done);
	})

	it('invalid input', function(done) {
		var inputs = [
		{},
		{
			price: '  ',
			currency: '  ',
			fullname: '  ',
			card_type: '  ',
			card_number: '  ',
			card_expire_month: '  ',
			card_expire_year: '  ',
			card_holder_firstname: ' ',
			card_holder_lastname: '  ',
			card_cvv: '  '
		},
		{
			price: '!@#$%^&*()0_+<>?',
			currency: '!@#$%^&*()0_+<>?',
			fullname: 'not matter',
			card_type: '!@#$%^&*()0_+<>?',
			card_number: '!@#$%^&*()0_+<>?',
			card_expire_month: '!@#$%^&*()0_+<>?',
			card_expire_year: '!@#$%^&*()0_+<>?',
			card_holder_firstname: 'not matter',
			card_holder_lastname: 'not matter',
			card_cvv: '!@#$%^&*()0_+<>?'
		}
		];

		async.forEach(inputs, function(input, callback){
			request(app)
			.post('/pay')
			.send(input)
			.expect(400)
			.end(callback);
		}, done)
	})
})
