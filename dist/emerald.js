(function() {
  var AbstractGenerator, Emerald, FunctionGenerator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Emerald = {
    Sonic: Sonic,
    domains: {
      N: function() {
        var _i, _results;
        return new Sonic.SimpleList((function() {
          _results = [];
          for (_i = 1; _i <= 100; _i++){ _results.push(_i); }
          return _results;
        }).apply(this));
      }
    },
    f: function(fn, options) {
      if (options == null) {
        options = {};
      }
      return new FunctionGenerator(fn, options);
    }
  };

  AbstractGenerator = (function(_super) {
    __extends(AbstractGenerator, _super);

    function AbstractGenerator(fn, options) {
      var v, x;
      this.fn = fn;
      for (x in Emerald) {
        v = Emerald[x];
        console.log(x);
      }
      AbstractGenerator.__super__.constructor.call(this, Emerald.domains.N(), {
        mapFn: this.fn
      });
    }

    return AbstractGenerator;

  })(Emerald.Sonic.MappedList);

  FunctionGenerator = (function(_super) {
    __extends(FunctionGenerator, _super);

    function FunctionGenerator() {
      return FunctionGenerator.__super__.constructor.apply(this, arguments);
    }

    return FunctionGenerator;

  })(AbstractGenerator);

  Emerald.factory = function(exports) {
    exports._ = Emerald;
    exports.Sonic = Sonic;
    exports.f = Emerald.f;
    exports.AbstractGenerator = AbstractGenerator;
    exports.FunctionGenerator = FunctionGenerator;
    return exports.domains = Emerald.domains;
  };

  if (typeof exports === 'object') {
    Emerald.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Emerald.factory(this.Emerald = exports);
      return exports;
    });
  } else {
    Emerald.factory(this.Emerald = {});
  }

}).call(this);
