'use strict';

module.exports = function(app) {
  const randoriController = require('../controllers/randoriController.js');
  app.route('/:ukes')
  .get(randoriController.get);  
};