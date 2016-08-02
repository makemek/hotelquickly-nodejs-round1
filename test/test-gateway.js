'use strict';

const Gateway = require('../src/service/')

describe('gateway', function() {

	var gateway; 
	var fakeService1 = {dummy: 1}, fakeService2 = {dummy: 2};

	beforeEach(function() {
		var route1 = {
			source: {
				cardType: 'A',
				currency: ['c1','c2','c3']
			},
			target: fakeService1
		};
		var route2 = {
			source: {
				cardType: 'B',
				currency: ['d1','d2','d3']
			},
			target: fakeService2
		};

		var config = [route1, route2];
		gateway = new Gateway(config);
	})

	it('return correct payment service', function() {
		assert.equal(gateway.transact('A', 'c1'), fakeService1);
		assert.equal(gateway.transact('B', 'd1'), fakeService2);
	})

	it('return null to non-existent route', function() {
		assert.isNull(gateway.transact('Z', ''), 'should return null for non-existent route');
	})

	it('default blank routing table', function() {
		var blankGateway = new Gateway();
		assert.isNull(blankGateway.transact('',''));
	})

})