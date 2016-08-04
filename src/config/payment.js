'use strict';

module.exports = exports = {
	paypal: {
	  'mode': 'sandbox',
	  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
	  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM',
	},

	braintree: {
		'api': {
			'merchantId': '37f6rs93g6pcqt9y',
			'publicKey': 'mvwvs9vyzvjmm7zx',
			'privateKey': '0a03f6db8f64a932415f42a1de6dd754'
		},
		'merchantAccountId': {
			'usd': 'usd',
			'sgd': 'sgd',
			'thb': 'thb'
		}
	}
}