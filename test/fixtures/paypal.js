const nock = require('nock');

nock('https://api.sandbox.paypal.com:443', {"encodedQueryParams":true})
  .persist()
  .post('/v1/oauth2/token', "grant_type=client_credentials")
  .reply(200, {"scope":"https://api.paypal.com/v1/payments/.* https://api.paypal.com/v1/vault/credit-card openid https://api.paypal.com/v1/developer/.* https://api.paypal.com/v1/vault/credit-card/.*","nonce":"2016-08-05T18:04:35Z3NuKMRDXSOWdyKEMMpN2ASupITS2or5Fi9Wm_t9391U","access_token":"A101.KOkLQwt_nigZDZvX945pjKfwxKVLfqOrfDvnp3BncY-2uApj_3bYuorLOyCvzgTM.CyfQqLSSIqrQq6KmXKvCzw-1Cxq","token_type":"Bearer","app_id":"APP-2EJ531395M785864S","expires_in":30495}, { date: 'Fri, 05 Aug 2016 18:36:20 GMT',
  server: 'Apache',
  proxy_server_info: 'host=slcsbplatformapiserv3001.slc.paypal.com;threadId=590',
  'paypal-debug-id': 'd4fdbe07aab15, d4fdbe07aab15',
  'correlation-id': 'd4fdbe07aab15',
  'x-paypal-token-service': 'IAAS',
  connection: 'close',
  'set-cookie':
   [ 'X-PP-SILOVER=name%3DSANDBOX3.API.1%26silo_version%3D1880%26app%3Dplatformapiserv%26TIME%3D2765923415%26HTTP_X_PP_AZ_LOCATOR%3D; Expires=Fri, 05 Aug 2016 19:06:20 GMT; domain=.paypal.com; path=/; Secure; HttpOnly',
     'X-PP-SILOVER=; Expires=Thu, 01 Jan 1970 00:00:01 GMT' ],
  vary: 'Authorization',
  'content-length': '449',
  'content-type': 'application/json' });

nock('https://api.sandbox.paypal.com:443', {"encodedQueryParams":true})
  .persist()
  .post('/v1/payments/payment/', {"intent":"sale","payer":{"payment_method":"credit_card","funding_instruments":[{"credit_card":{"type":"visa","number":"4111111111111111","expire_month":"9","expire_year":"2021","cvv2":"874","first_name":"Joe","last_name":"Shopper"}}]},"transactions":[{"amount":{"total":1,"currency":"USD"}}]})
  .reply(200, {"id":"PAY-0MY35455HK0674703K6SNZJI","create_time":"2016-08-05T18:36:21Z","update_time":"2016-08-05T18:36:21Z","state":"created","intent":"sale","payer":{"payment_method":"credit_card","funding_instruments":[{"credit_card":{"type":"visa","number":"xxxxxxxxxxxx1111","expire_month":"9","expire_year":"2021","first_name":"Joe","last_name":"Shopper"}}]},"transactions":[{"amount":{"total":"1.00","currency":"USD","details":{"subtotal":"1.00"}},"related_resources":[]}],"links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-0MY35455HK0674703K6SNZJI","rel":"self","method":"GET"}]}, { date: 'Fri, 05 Aug 2016 18:36:21 GMT',
  server: 'Apache',
  proxy_server_info: 'host=slcsbplatformapiserv3001.slc.paypal.com;threadId=416',
  'paypal-debug-id': 'eb83c9baff44, eb83c9baff44',
  'correlation-id': 'eb83c9baff44',
  'content-language': '*',
  connection: 'close',
  'set-cookie':
   [ 'X-PP-SILOVER=name%3DSANDBOX3.API.1%26silo_version%3D1880%26app%3Dplatformapiserv%26TIME%3D2782700631%26HTTP_X_PP_AZ_LOCATOR%3D; Expires=Fri, 05 Aug 2016 19:06:51 GMT; domain=.paypal.com; path=/; Secure; HttpOnly',
     'X-PP-SILOVER=; Expires=Thu, 01 Jan 1970 00:00:01 GMT' ],
  vary: 'Authorization',
  'content-length': '595',
  'content-type': 'application/json' });

nock('https://api.sandbox.paypal.com:443', {"encodedQueryParams":true})
  .post('/v1/payments/payment/', {"intent":"sale","payer":{"payment_method":"credit_card","funding_instruments":[{"credit_card":{"type":"visa","number":"0123456789","expire_month":"9","expire_year":"2021","cvv2":"874","first_name":"Joe","last_name":"Shopper"}}]},"transactions":[{"amount":{"total":1,"currency":"USD"}}]})
  .reply(400, {"name":"VALIDATION_ERROR","details":[{"field":"payer.funding_instruments[0].credit_card.number","issue":"Value is invalid."}],"message":"Invalid request. See details.","information_link":"https://developer.paypal.com/webapps/developer/docs/api/#VALIDATION_ERROR","debug_id":"96adc98ecec6b"}, { date: 'Fri, 05 Aug 2016 18:36:52 GMT',
  server: 'Apache',
  proxy_server_info: 'host=slcsbplatformapiserv3002.slc.paypal.com;threadId=1415',
  'paypal-debug-id': '96adc98ecec6b, 96adc98ecec6b',
  'correlation-id': '96adc98ecec6b',
  'content-language': '*',
  connection: 'close, close',
  'set-cookie':
   [ 'X-PP-SILOVER=name%3DSANDBOX3.API.1%26silo_version%3D1880%26app%3Dplatformapiserv%26TIME%3D3302794327%26HTTP_X_PP_AZ_LOCATOR%3D; Expires=Fri, 05 Aug 2016 19:06:52 GMT; domain=.paypal.com; path=/; Secure; HttpOnly',
     'X-PP-SILOVER=; Expires=Thu, 01 Jan 1970 00:00:01 GMT' ],
  vary: 'Authorization',
  'content-length': '291',
  'content-type': 'application/json' });

nock('https://api.sandbox.paypal.com:443', {"encodedQueryParams":true})
  .post('/v1/payments/payment/', {"intent":"sale","payer":{"payment_method":"credit_card","funding_instruments":[{"credit_card":{"type":"visa","number":"4111111111111111","expire_month":"9","expire_year":"2021","cvv2":"874","first_name":"Joe","last_name":"Shopper"}}]},"transactions":[{"amount":{"total":0,"currency":"USD"}}]})
  .reply(400, {"name":"VALIDATION_ERROR","details":[{"field":"transactions[0].amount","issue":"Amount cannot be zero."}],"message":"Invalid request. See details.","information_link":"https://developer.paypal.com/webapps/developer/docs/api/#VALIDATION_ERROR","debug_id":"53f86ad2bbc94"}, { date: 'Fri, 05 Aug 2016 18:36:53 GMT',
  server: 'Apache',
  proxy_server_info: 'host=slcsbplatformapiserv3002.slc.paypal.com;threadId=560',
  'paypal-debug-id': '53f86ad2bbc94, 53f86ad2bbc94',
  'correlation-id': '53f86ad2bbc94',
  'content-language': '*',
  connection: 'close, close',
  'set-cookie':
   [ 'X-PP-SILOVER=name%3DSANDBOX3.API.1%26silo_version%3D1880%26app%3Dplatformapiserv%26TIME%3D3319571543%26HTTP_X_PP_AZ_LOCATOR%3D; Expires=Fri, 05 Aug 2016 19:06:53 GMT; domain=.paypal.com; path=/; Secure; HttpOnly',
     'X-PP-SILOVER=; Expires=Thu, 01 Jan 1970 00:00:01 GMT' ],
  vary: 'Authorization',
  'content-length': '271',
  'content-type': 'application/json' });
