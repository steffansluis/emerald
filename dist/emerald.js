(function() {
  var Emerald;

  Emerald = {};

  Emerald.factory = function(exports) {
    return exports._ = Emerald;
  };

  if (typeof exports === 'object') {
    Emerald.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Emerald.factory(this.Emerald = exports);
      return exports;
    });
  } else {
    Emerald.factory(this.Emerald = {});
  }

}).call(this);
