(function() {
  var AbstractFn, ProductFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  ProductFn = (function(_super) {
    __extends(ProductFn, _super);

    function ProductFn(options) {
      ProductFn.__super__.constructor.call(this, options);
      this.left = Emerald(options.left);
      this.right = Emerald(options.right);
    }

    ProductFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate().times(this.right.evaluate());
    };

    ProductFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "*" + right + ")";
    };

    return ProductFn;

  })(AbstractFn);

  module.exports = ProductFn;

}).call(this);
