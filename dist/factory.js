(function() {
  var factory;

  factory = function(item) {
    var AbstractFn, Big, Constant, Vector;
    Constant = require('./constant');
    Vector = require('./vector');
    AbstractFn = require('./abstract_fn');
    Big = require('big.js');
    if (item instanceof Constant || item instanceof Vector || item instanceof AbstractFn) {
      return item;
    }
    if (typeof item === "number" || item instanceof Big) {
      return new Constant(item);
    } else if (item instanceof Array) {
      return new Vector(item);
    } else if (typeof item === "function") {
      return new AbstractFn(item);
    }
  };

  module.exports = factory;

}).call(this);

//# sourceMappingURL=factory.js.map
