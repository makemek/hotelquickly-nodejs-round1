'use strict';

const express = require('express');
var app = express();

app.use(express.static('src/public'));

app.listen(3000);
