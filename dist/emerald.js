(function() {
  var AbstractFn, Big, Constant, DifferenceFn, Emerald, PowerFn, ProductFn, RationalFn, Sonic, SumFn, factory, fns, utilities,
    __slice = [].slice;

  Sonic = require('sonic');

  Big = require('big.js');

  factory = require('./factory');

  utilities = require('./utilities');

  AbstractFn = require('./abstract_fn');

  Constant = require('./constant');

  SumFn = require('./sum_fn');

  DifferenceFn = require('./difference_fn');

  ProductFn = require('./product_fn');

  RationalFn = require('./rational_fn');

  PowerFn = require('./power_fn');

  Emerald = function() {
    return factory.apply(null, arguments);
  };

  Emerald.factory = factory;

  Emerald.Sonic = Sonic;

  Emerald.Big = Big;

  Emerald.AbstractFn = AbstractFn;

  Emerald.Constant = Constant;

  Emerald.SumFn = SumFn;

  Emerald.DifferenceFn = DifferenceFn;

  Emerald.ProductFn = ProductFn;

  Emerald.RationalFn = RationalFn;

  Emerald.PowerFn = PowerFn;

  fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub", "mod", "plus", "add", "pow", "round", "sqrt", "times", "mul", "toExponential", "toFixed", "toPrecision"];

  fns.forEach(function(key) {
    return Emerald.Sonic.AbstractList.prototype[key] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.map(function(value) {
        var _ref;
        return (_ref = Big(value))[key].apply(_ref, args);
      });
    };
  });

  module.exports = Emerald;

}).call(this);
