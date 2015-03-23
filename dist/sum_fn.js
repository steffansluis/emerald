(function() {
  var AbstractFn, SumFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  SumFn = (function(_super) {
    __extends(SumFn, _super);

    function SumFn(options) {
      SumFn.__super__.constructor.call(this, options);
      this.left = Emerald(options.left);
      this.right = Emerald(options.right);
    }

    SumFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate().plus(this.right.evaluate());
    };

    SumFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "+" + right + ")";
    };

    return SumFn;

  })(AbstractFn);

  module.exports = SumFn;

}).call(this);
