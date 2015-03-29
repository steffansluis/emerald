(function() {
  var AbstractFn, Big, Constant, DifferenceFn, Emerald, PowerFn, ProductFn, RationalFn, Sonic, SumFn, Vector, factory, fns, key, utilities, value, _fn,
    __slice = [].slice;

  Sonic = require('sonic');

  Big = require('big.js');

  factory = require('./factory');

  utilities = require('./utilities');

  Vector = require('./vector');

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

  Emerald.Vector = Vector;

  Emerald.AbstractFn = AbstractFn;

  Emerald.Constant = Constant;

  Emerald.SumFn = SumFn;

  Emerald.DifferenceFn = DifferenceFn;

  Emerald.ProductFn = ProductFn;

  Emerald.RationalFn = RationalFn;

  Emerald.PowerFn = PowerFn;

  fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub", "mod", "plus", "add", "pow", "round", "sqrt", "times", "mul", "toExponential", "toFixed", "toPrecision"];

  fns.forEach(function(key) {
    return Emerald[key] = function() {
      var args, value, _ref;
      value = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = Emerald.factory(value))[key].apply(_ref, args);
    };
  });

  _fn = (function(_this) {
    return function(key, value) {
      return Emerald[key] = function() {
        var args, obj;
        obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return value.apply(Emerald.factory(obj), args);
      };
    };
  })(this);
  for (key in utilities) {
    value = utilities[key];
    _fn(key, value);
  }

  module.exports = Emerald;

}).call(this);

//# sourceMappingURL=emerald.js.map
