(function() {
  var AbstractFn, PowerFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  PowerFn = (function(_super) {
    __extends(PowerFn, _super);

    function PowerFn(options) {
      if (options == null) {
        options = {};
      }
      if (typeof options === "number") {
        options = {
          exp: options
        };
      }
      PowerFn.__super__.constructor.call(this, options);
      this.exp = options.exp;
    }

    PowerFn.prototype.evaluate = function() {
      var exp;
      exp = parseFloat(this.exp.evaluate().toPrecision());
      return this.inner.evaluate().pow(exp);
    };

    PowerFn.prototype.integrate = function() {
      var primitive;
      primitive = this.inner.intergrate().divide(this.exp);
      primitive.exp++;
      return primitive;
    };

    PowerFn.prototype.toString = function() {
      var inner;
      inner = this.inner.toString();
      return "(" + inner + ")^" + this.exp;
    };

    return PowerFn;

  })(AbstractFn);

  module.exports = PowerFn;

}).call(this);

//# sourceMappingURL=power_fn.js.map
