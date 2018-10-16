'use strict';
const http = require('http');
 
exports.get = function(req, response) {
  let randori = "<b>randori started...</b></br>";
  let ukes = parseInt(req.params.ukes);
  let ukeAttacking = 1;

  var doTechnique = () => { 
    http.get({
      host: process.env.AIKIDO_APP_HOST || 'service.aikido-app.com', 
      port: 80,
      path: '/nage',
    }, (res) => {
      res.on('data', function(d) {
        randori += d + "</br>";
      });
      res.on('end', function() {
        if (ukeAttacking < ukes)
        {
          ukeAttacking++;
          doAtemi();
        }
        else {        
          console.log(`randori executed on ${new Date().toLocaleTimeString()}`);
          response.send(randori);
        }
      });
    })
  }
  
  var doAtemi = () => { 
      http.get({
        host: process.env.AIKIDO_APP_HOST || 'service.aikido-app.com', 
        port: 80,
        path: '/uke',
      }, (res) => {
        res.on('data', function(d) {
          randori += (d + ", ");
        });
        res.on('end', function() {
          doTechnique();
        });
      })
  };
  
  doAtemi(); 
};