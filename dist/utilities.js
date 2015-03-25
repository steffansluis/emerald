(function() {
  var utilities;

  utilities = {
    power: function(exp) {
      var PowerFn, factory, options;
      factory = require('./factory');
      PowerFn = require('./power_fn');
      options = {
        exp: factory(exp),
        fn: this
      };
      return new PowerFn(options);
    },
    square: function() {
      return this.power(2);
    },
    cube: function() {
      return this.power(3);
    },
    sqrt: function() {
      return this.power(0.5);
    },
    nroot: function(n) {
      return this.power(factory(1).over(n));
    },
    product: function(right) {
      var ProductFn, factory;
      factory = require('./factory');
      ProductFn = require('./product_fn');
      return new ProductFn({
        left: this,
        right: factory(right)
      });
    },
    times: function(right) {
      return this.product(right);
    },
    divide: function(right) {
      var RationalFn, factory;
      factory = require('./factory');
      RationalFn = require('./rational_fn');
      return new RationalFn({
        left: this,
        right: factory(right)
      });
    },
    over: function(right) {
      return this.divide(right);
    },
    faculty: function() {
      if (this.inner.evaluate().eq(factory(0).evaluate())) {
        return 1;
      } else {
        return this.product(this.minus(1).faculty());
      }
    },
    sum: function(right) {
      var SumFn, factory;
      factory = require('./factory');
      SumFn = require('./sum_fn');
      return new SumFn({
        left: this,
        right: factory(right)
      });
    },
    minus: function(right) {
      var DifferenceFn, factory;
      factory = require('./factory');
      DifferenceFn = require('./difference_fn');
      return new DifferenceFn({
        left: this,
        right: factory(right)
      });
    }
  };

  module.exports = utilities;

}).call(this);
