(function() {
  var AbstractFn, Aggregator, Constant, Delta, Domain, Emerald, Generator, PowerFn, ProductFn, SumFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Emerald = {
    Sonic: Sonic,
    domains: {
      N: function() {
        return new Domain(function(x) {
          return x + 1;
        });
      }
    },
    f: function(fn) {
      if (fn instanceof AbstractFn) {
        return fn;
      }
      switch (typeof fn) {
        case "number":
          return new Constant(fn);
        case "function":
          return new AbstractFn(fn);
      }
    }
  };

  AbstractFn = (function(_super) {
    __extends(AbstractFn, _super);

    function AbstractFn(options) {
      var key, value, _i, _j, _len, _len1, _ref, _ref1;
      if (options == null) {
        options = {};
      }
      if (typeof options === "function") {
        if (!(options instanceof AbstractFn)) {
          options.apply(this);
        }
      } else {
        if (options instanceof AbstractFn) {
          this.inner = options;
        } else {
          this.inner = options.fn || options.value;
        }
      }
      this.from = {};
      _ref = options.from || Emerald.domains.N();
      for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
        key = _ref[value];
        this.from[key] = value.createHandle();
      }
      this.to = {};
      _ref1 = options.to || Emerald.domains.N();
      for (value = _j = 0, _len1 = _ref1.length; _j < _len1; value = ++_j) {
        key = _ref1[value];
        this.to[key] = value.createHandle();
      }
    }

    AbstractFn.prototype.power = function(exp) {
      var options;
      options = {
        exp: exp,
        fn: this
      };
      return new PowerFn(options);
    };

    AbstractFn.prototype.square = function() {
      return this.power(2);
    };

    AbstractFn.prototype.cube = function() {
      return this.power(3);
    };

    AbstractFn.prototype.product = function(right) {
      return new ProductFn({
        left: this,
        right: right
      });
    };

    AbstractFn.prototype.sum = function(right) {
      return new SumFn({
        left: this,
        right: right
      });
    };

    AbstractFn.prototype.toString = function() {
      var _ref;
      return "" + ((_ref = this.inner) != null ? _ref.toString() : void 0);
    };

    return AbstractFn;

  })(Emerald.Sonic.MappedList);

  Constant = (function(_super) {
    __extends(Constant, _super);

    function Constant(options) {
      if (typeof options === "number") {
        options = {
          value: options
        };
      }
      Constant.__super__.constructor.call(this, options);
    }

    Constant.prototype.integrate = function() {};

    Constant.prototype.evaluate = function() {
      return this.inner;
    };

    return Constant;

  })(AbstractFn);

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
      return Math.pow(this.inner.evaluate(), this.exp);
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
      return "(" + inner + ")^" + this.power;
    };

    return PowerFn;

  })(AbstractFn);

  ProductFn = (function(_super) {
    __extends(ProductFn, _super);

    function ProductFn(options) {
      if (typeof options === "number") {
        options = {
          right: new Constant(options)
        };
      }
      ProductFn.__super__.constructor.call(this, options);
      this.left = options.left;
      this.right = options.right;
    }

    ProductFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate() * this.right.evaluate();
    };

    ProductFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "*" + right + ")";
    };

    return ProductFn;

  })(AbstractFn);

  SumFn = (function(_super) {
    __extends(SumFn, _super);

    function SumFn(options) {
      if (typeof options === "number") {
        options = {
          right: new Constant(options)
        };
      }
      SumFn.__super__.constructor.call(this, options);
      this.left = options.left;
      this.right = options.right;
    }

    SumFn.prototype.evaluate = function(left, right) {
      return this.left.evaluate() + this.right.evaluate();
    };

    SumFn.prototype.toString = function() {
      var left, right;
      left = this.left.toString();
      right = this.right.toString();
      return "(" + left + "+" + right + ")";
    };

    return SumFn;

  })(AbstractFn);

  Delta = (function(_super) {
    __extends(Delta, _super);

    function Delta(value, options) {
      if (value == null) {
        value = 1;
      }
      if (options == null) {
        options = {};
      }
      Delta.__super__.constructor.call(this, 1, options);
    }

    Delta.prototype.next = function() {
      return this._next || (this._next = new Delta());
    };

    Delta.prototype.previous = function() {
      return this._previous || (this._previous = new Delta());
    };

    return Delta;

  })(Emerald.Sonic.Entry);

  Generator = (function(_super) {
    __extends(Generator, _super);

    Generator.prototype.Entry = Delta;

    function Generator(options) {
      if (options == null) {
        options = {};
      }
      Generator.__super__.constructor.call(this, options);
      this._insert(1, {
        ater: this.headEntry,
        before: this.tailEntry
      });
    }

    return Generator;

  })(Emerald.Sonic.AbstractList);

  Aggregator = (function(_super) {
    __extends(Aggregator, _super);

    function Aggregator() {
      return Aggregator.__super__.constructor.apply(this, arguments);
    }

    Aggregator.prototype.value = function() {
      var first, previous;
      if (this._value != null) {
        return this._value;
      }
      console.log("source", this.source.value(), "in", this.id);
      if (previous = this.previous()) {
        first = this.list.headEntry.next();
        if (this === first) {
          console.log("first");
          return this._value = this.list.mapFn(this.source.value());
        } else {
          return console.log("Other", previous === first);
        }
      }
    };

    return Aggregator;

  })(Emerald.Sonic.MappedEntry);

  Domain = (function(_super) {
    __extends(Domain, _super);

    Domain.prototype.Entry = Aggregator;

    function Domain(options) {
      if (options == null) {
        options = {};
      }
      if (typeof options === "function") {
        options = {
          mapFn: options
        };
      }
      this.generator = options.generator || new Generator();
      Domain.__super__.constructor.call(this, this.generator, options);
    }

    return Domain;

  })(Emerald.Sonic.MappedList);

  Emerald.factory = function(exports) {
    exports._ = Emerald;
    exports.Sonic = Sonic;
    exports.f = Emerald.f;
    exports.AbstractFn = AbstractFn;
    exports.Constant = Constant;
    exports.PowerFn = PowerFn;
    exports.ProductFn = ProductFn;
    exports.SumFn = SumFn;
    exports.Delta = Delta;
    exports.Generator = Generator;
    exports.Aggregator = Aggregator;
    exports.Domain = Domain;
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
