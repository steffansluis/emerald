(function() {
  var Big, Emerald, Sonic;

  Sonic = require('sonic');

  Big = require('big.js');

  Emerald = function(item) {};

  Emerald._ = Emerald;

  Emerald.Sonic = Sonic;

  Emerald.Big = Big;

  module.exports = Emerald;

}).call(this);
