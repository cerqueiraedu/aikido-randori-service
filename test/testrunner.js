var expect = require('chai').expect;
var randoriController = require('../api/controllers/randoriController.js');
var totalTimeout = 3000;

class RandoriCallback {
  constructor() {
    this.result = "failed";
    
    RandoriCallback.prototype.send = (result) => {
      this.result = result;
    };

    this.AmIDone = async (timeoutms) => {
      return new Promise((resolve, reject) => {
        var check = () => {
          if(this.result != "failed") { resolve(this.result) }
          else if((timeoutms -= 100) < 0) reject("test request has timed out")
          else setTimeout(check, 100)
        }
        setTimeout(check, 100)
      });
    };
  }
}

describe('randoriController.get(3)', () => {
  var randoriCallback = new RandoriCallback();
  var request = { "params": { "ukes": 3 } };

  it('should return 3 random atemis and 3 random techniques', async () => {
    randoriController.get(request, randoriCallback);
    await randoriCallback.AmIDone(totalTimeout)
    .then(result => {
      console.log(result);
      expect(result.match(/uke attacks using./g).length).to.be.equal(3);
      expect(randoriCallback.result.match(/nage applies./g).length).to.be.equal(3);
    })
    .catch(ex => {
      console.log(ex);
      throw ex;
    });
  })
}); 