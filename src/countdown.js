var Twitter = require('twitter')
    q = require('q');

function Countdown(config){
  var countdown = {},
      client = new Twitter(config.credentialsFile);

  countdown.post = function(message){
    var deferred = q.defer();
    client.post('statuses/update', {status: message},  function(error, tweet, response){
      if(error) deferred.reject(error);
      deferred.resolve(tweet);
    });
    return deferred.promise;
  }
  return countdown;
};

module.exports = Countdown;