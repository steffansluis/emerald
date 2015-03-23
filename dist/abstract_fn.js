(function() {
  var AbstractFn, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Unit = require('sonic/dist/unit');

  AbstractFn = (function(_super) {
    __extends(AbstractFn, _super);

    function AbstractFn(options) {
      if (options == null) {
        options = {};
      }
      if (typeof options === "function") {
        if (options instanceof AbstractFn || options instanceof Emerald.Big) {
          this.inner = options;
        } else {
          options.apply(this);
        }
      } else {
        switch (typeof options) {
          case "object":
            this.inner = options.inner;
            break;
          case "number":
            this.inner = new Emerald.Big(options);
        }
      }
    }

    AbstractFn.prototype.power = function(exp) {
      var options;
      options = {
        exp: Emerald(exp),
        fn: this
      };
      return new PowerFn(options);
    };

    AbstractFn.prototype.square = function() {
      return this.power(2);
    };

    AbstractFn.prototype.cube = function() {
      return this.power(3);
    };

    AbstractFn.prototype.sqrt = function() {
      return this.power(0.5);
    };

    AbstractFn.prototype.nroot = function(n) {
      return this.power(Emerald(1).over(n));
    };

    AbstractFn.prototype.product = function(right) {
      return new ProductFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.times = function(right) {
      return this.product(right);
    };

    AbstractFn.prototype.divide = function(right) {
      return new RationalFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.over = function(right) {
      return this.divide(right);
    };

    AbstractFn.prototype.faculty = function() {
      if (this.inner.evaluate().eq(Emerald(0).evaluate())) {
        return 1;
      } else {
        return this.product(this.minus(1).faculty());
      }
    };

    AbstractFn.prototype.sum = function(right) {
      return new SumFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.minus = function(right) {
      return new DifferenceFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.toString = function() {
      var _ref;
      return "" + ((_ref = this.inner) != null ? _ref.toString() : void 0);
    };

    return AbstractFn;

  })(Unit);

  module.exports = AbstractFn;

}).call(this);
