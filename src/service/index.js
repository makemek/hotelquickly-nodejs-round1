'use strict';

/**
 * Create a payment service router
 * A routing configuration have to map source to destination with the following properties
 * [{source: {cardType: <string>, currenncy: [<string>]}, target: <PaymentService>}]
 * 
 * @param  {object} routingTable - an object that maps source card type and currency to destination
 */
function Gateway(routingTable) {
	routingTable = routingTable || [];
	this.config = routingTable;
}

Gateway.prototype.constructor = Gateway;

/**
 * Get a payment service based on credit card type and currency unit
 * If there are duplicate routes, same card type with same currency, it will return the top-most route
 * 
 * @param  {string} cardType - abbriviated type name (case-insensitive)
 * @param  {string} currency - abbriviated currency unit (case-insensitive)
 * @return {null|object} null if no route found, otherwise return interface to payment service
 */
Gateway.prototype.transact = function(cardType, currency) {

	var routes = this.config.filter(matchRoute);
	if(!routes.length)
		return null;
	return routes[0].target;

	function matchRoute(route) {
		const ANYKIND_SYMBOL = '*';
		var sameType, currencyExist;
		var lookupSource = route.source;

		if(lookupSource.cardType === ANYKIND_SYMBOL)
			sameType = true;
		else
			sameType = lookupSource.cardType.toLowerCase() === cardType.toLowerCase();

		if(lookupSource.currency === ANYKIND_SYMBOL)
			currencyExist = true;
		else {
			currencyExist = lookupSource.currency.filter(function(_currency){
				return _currency.toLowerCase() === currency.toLowerCase()
			}).length > 0;
		}

		return sameType && currencyExist;
	}
}


module.exports = exports = Gateway;