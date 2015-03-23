(function() {
  var AbstractFn, DifferenceFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  DifferenceFn = (function(_super) {
    __extends(DifferenceFn, _super);

    function DifferenceFn(options) {
      DifferenceFn.__super__.constructor.call(this, options);
      this.left = Emerald(options.left);
      this.right = Emerald(options.right);
    }

    DifferenceFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate().minus(this.right.evaluate());
    };

    DifferenceFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "-" + right + ")";
    };

    return DifferenceFn;

  })(AbstractFn);

  module.exports = DifferenceFn;

}).call(this);
