'use strict';

/**
 * Connect application and database together
 * Database needs to be started before launching the application
 * Otherise, it will throw an error
 */

const LISTENING_PORT = 8080;

const mongoose = require('mongoose');
const bluebird = require('bluebird');
const app = require('./app');

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/hotel-quickly')
.then(function() {
	var listener = app.listen(LISTENING_PORT, function(){
		console.log('Application is listening at port ' + listener.address().port);
	})
})
.catch(function(error){
	throw error;
})
