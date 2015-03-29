(function() {
  var AbstractFn, RationalFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  RationalFn = (function(_super) {
    __extends(RationalFn, _super);

    function RationalFn(options) {
      RationalFn.__super__.constructor.call(this, options);
      this.left = Emerald(options.left);
      this.right = Emerald(options.right);
    }

    RationalFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate().div(this.right.evaluate());
    };

    RationalFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "/" + right + ")";
    };

    return RationalFn;

  })(AbstractFn);

  module.exports = RationalFn;

}).call(this);

//# sourceMappingURL=rational_fn.js.map
