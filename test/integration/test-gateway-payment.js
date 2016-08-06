'use strict';

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
})
