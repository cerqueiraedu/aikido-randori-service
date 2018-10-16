require('newrelic');
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const randoriRoutes = require('./api/routes/randoriRoutes'); 
var randoriService = express();

randoriService.use(bodyParser.json());

randoriRoutes(randoriService);
randoriService.listen(8080, function () {
  console.log('Aikido Randori API listening on port 8080!');
});
