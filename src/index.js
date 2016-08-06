'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('src/public'));
app.use('/', require('./route/'));

mongoose.connect('mongodb://localhost/hotel-quickly', function(error, res) {
	if(error)
		throw error;

	const PORT = 3000;
	app.listen(PORT, function() {
		console.log('Application is started at port ' + PORT)
	});
});
