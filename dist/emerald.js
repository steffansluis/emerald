(function() {
  var AbstractFn, Big, Constant, DifferenceFn, Emerald, PowerFn, ProductFn, RationalFn, Sonic, SumFn, factory, key, utilities, value, _fn,
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

  Emerald = factory;

  _fn = (function(_this) {
    return function(key, value) {
      return Emerald[key] = function() {
        var args, obj;
        obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return value.apply(factory(obj), args);
      };
    };
  })(this);
  for (key in utilities) {
    value = utilities[key];
    _fn(key, value);
  }

  Emerald._ = Emerald;

  Emerald.Sonic = Sonic;

  Emerald.Big = Big;

  Emerald.AbstractFn = AbstractFn;

  Emerald.Constant = Constant;

  Emerald.SumFn = SumFn;

  Emerald.DifferenceFn = DifferenceFn;

  Emerald.ProductFn = ProductFn;

  Emerald.RationalFn = RationalFn;

  Emerald.PowerFn = PowerFn;

  module.exports = Emerald;

}).call(this);
