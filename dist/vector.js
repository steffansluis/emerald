(function() {
  var AbstractList, FlatMapList, Vector, fns,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  FlatMapList = require('sonic/dist/flat_map_list');

  AbstractList = require('sonic/dist/abstract_list');

  Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector(values) {
      var factory;
      factory = require('./factory');
      Vector.__super__.constructor.call(this, values, factory);
    }

    return Vector;

  })(FlatMapList);

  fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub", "mod", "plus", "add", "pow", "round", "sqrt", "times", "mul", "toExponential", "toFixed", "toPrecision"];

  fns.forEach(function(key) {
    return AbstractList.prototype[key] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.invoke.apply(this, [key].concat(__slice.call(args)));
    };
  });

  module.exports = Vector;

}).call(this);

//# sourceMappingURL=vector.js.map
