(function() {
  var Big, Constant, Unit, fns,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Unit = require('sonic/dist/unit');

  Big = require('big.js');

  Constant = (function(_super) {
    __extends(Constant, _super);

    function Constant(value) {
      if (value instanceof Big) {
        this._value = value;
      } else {
        this._value = Big(value);
      }
      Constant.__super__.constructor.call(this, this);
    }

    Constant.prototype.push = function(value) {
      this._value = Big(value);
      return Constant.__super__.push.call(this, this);
    };

    Constant.prototype.toExponential = function() {
      return this._value.toExponential();
    };

    Constant.prototype.toFixed = function() {
      return this._value.toFixed();
    };

    Constant.prototype.toPrecision = function() {
      return this._value.toPrecision();
    };

    Constant.prototype.toString = function() {
      return this._value.toString();
    };

    Constant.prototype.evaluate = function() {
      return this._value;
    };

    return Constant;

  })(Unit);

  fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub", "mod", "plus", "add", "pow", "round", "sqrt", "times", "mul"];

  fns.forEach(function(key) {
    var factory;
    factory = require('./factory');
    return Constant.prototype[key] = function() {
      var args, res, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      res = (_ref = this._value)[key].apply(_ref, args);
      if (res instanceof Big) {
        return factory(res);
      } else {
        return res;
      }
    };
  });

  module.exports = Constant;

}).call(this);

//# sourceMappingURL=constant.js.map
