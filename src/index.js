'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('src/public'));
app.use('/', require('./route/'));

app.listen(3000);
