(function() {
  var AbstractFn, Constant,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

  Constant = (function(_super) {
    __extends(Constant, _super);

    function Constant(options) {
      if (options == null) {
        options = {};
      }
      Constant.__super__.constructor.call(this, options);
    }

    Constant.prototype.integrate = function() {};

    Constant.prototype.evaluate = function() {
      return this.inner;
    };

    return Constant;

  })(AbstractFn);

  module.exports = Constant;

}).call(this);
