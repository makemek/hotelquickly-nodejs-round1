'use strict';

const paypal = require('../service/paypal');
const braintree = require('../service/braintree');

/**
 * Gateway payment service routing table
 * @type {Array} contains a mapping between source's card information and target payment service
 *
 * <source> consist of
 *  - cardType {string} type of credit card (case-insensitive)
 *  - currency {string[]} array of ISO 4217 currency unit (case-insensitive)
 *    If source's currency value found in the array, it is considered valid
 * You can use '*' to mean any kind of type
 * 
 * <target> is the detinated payment service
 *
 * Please note that higher index in the array means higher priority
 * Meaning that if there are duplicates, the upper-most one is selected
 */
const GATEWAY = [
{source: {cardType: 'AMEX', currency: ['USD']}, target: paypal},
{source: {cardType: 'AMEX', currency: '*'}, target: new Error('AMEX can be use with USD only')},
{source: {cardType: '*', currency: ['USD', 'EUR', 'AUD']}, target: paypal},
{source: {cardType: '*', currency: '*'}, target: braintree}
]

module.exports = exports = GATEWAY;
