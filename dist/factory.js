(function() {
  var AbstractFn, Constant, factory;

  AbstractFn = require('./abstract_fn');

  Constant = require('./constant');

  factory = function(item) {
    if (item instanceof AbstractFn) {
      return item;
    }
    switch (typeof item) {
      case "number":
        return new Constant(item);
      case "function":
        return new AbstractFn(item);
    }
  };

  module.exports = factory;

}).call(this);
