'use strict';

const Gateway = require('../../src/service/')

describe('gateway', function() {

	var gateway, route1, route2; 
	var fakeService1 = {dummy: 1}, fakeService2 = {dummy: 2};

	beforeEach(function() {
		route1 = {
			source: {
				cardType: 'A',
				currency: ['c1','c2','c3']
			},
			target: fakeService1
		};
		route2 = {
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
		assert.deepEqual(gateway.transact('A', 'c1'), fakeService1);
		assert.deepEqual(gateway.transact('B', 'd1'), fakeService2);
	})

	it('return null to non-existent route', function() {
		assert.isNull(gateway.transact('Z', ''), 'should return null for non-existent route');
	})

	it('default blank routing table', function() {
		var blankGateway = new Gateway();
		assert.isNull(blankGateway.transact('',''));
	})

	it('duplicate route should return top-most route', function() {
		var dumplicateRoute = route1;
		var fakeService = {dummy: -1};

		dumplicateRoute.target = fakeService;
		dumplicateRoute.source.currency.push('x');

		var anotherDuplicateRoute = dumplicateRoute;
		var anotherFakeService = {dummy: -2};
		anotherDuplicateRoute.target = anotherFakeService;

		gateway = new Gateway([route1, dumplicateRoute, anotherDuplicateRoute]);
		assert.deepEqual(gateway.transact(route1.source.cardType, route1.source.currency[1]), route1.target, 'should route to the correct target');
		assert.deepEqual(gateway.transact(route1.source.cardType, 'x'), dumplicateRoute.target, 'should route to the correct target');
	})

	it('handle card type that is configured with a special symbol *', function() {
		route2.source.cardType = '*';
		assert.deepEqual(gateway.transact('whatever', route2.source.currency[1]), route2.target, 'should route to the correct target');
	})

	it('handle currency that is configured with a special symbol *', function() {
		route2.source.currency = '*';
		assert.deepEqual(gateway.transact(route2.source.cardType, 'whatever'), route2.target, 'should route to the correct target');
	})
})