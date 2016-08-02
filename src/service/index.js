'use strict';

/**
 * Create a payment service router
 * A routing configuration have to map source to destination with the following properties
 * [{source: {cardType: <string>, currenncy: [<string>]}, target: <PaymentService>}]
 * 
 * @param  {object} routerConfig - an object that maps source card type and currency to destination
 */
function Gateway(routerConfig) {
	routerConfig = routerConfig || {};
	this.config = routerConfig;
}

Gateway.prototype.constructor = Gateway;

Gateway.prototype.transact = function(creditCard, currency) {

	var routes = this.config.filter(function(route) {
		var sameType = route.source.cardType === creditCard.type;
		var currencyExist = route.source.currency.filter(function(_currency){
			return _currency === currency})
		.length > 0;
		return sameType && currencyExist;
	})

	if(!routes.length)
		return null;
	return routes[0].target;
}

module.exports = exports = Gateway;