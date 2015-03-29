(function() {
  var AbstractFn, List, utilities,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  List = require('sonic/dist/list');

  utilities = require('./utilities');

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

    AbstractFn.prototype.toString = function() {
      var _ref;
      return "" + ((_ref = this.inner) != null ? _ref.toString() : void 0);
    };

    return AbstractFn;

  })(List);

  module.exports = AbstractFn;

}).call(this);

//# sourceMappingURL=abstract_fn.js.map
