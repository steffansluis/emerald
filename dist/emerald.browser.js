(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Emerald = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var AbstractFn, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Unit = require('sonic/dist/unit');

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

    AbstractFn.prototype.power = function(exp) {
      var options;
      options = {
        exp: Emerald(exp),
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

    AbstractFn.prototype.sqrt = function() {
      return this.power(0.5);
    };

    AbstractFn.prototype.nroot = function(n) {
      return this.power(Emerald(1).over(n));
    };

    AbstractFn.prototype.product = function(right) {
      return new ProductFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.times = function(right) {
      return this.product(right);
    };

    AbstractFn.prototype.divide = function(right) {
      return new RationalFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.over = function(right) {
      return this.divide(right);
    };

    AbstractFn.prototype.faculty = function() {
      if (this.inner.evaluate().eq(Emerald(0).evaluate())) {
        return 1;
      } else {
        return this.product(this.minus(1).faculty());
      }
    };

    AbstractFn.prototype.sum = function(right) {
      return new SumFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.minus = function(right) {
      return new DifferenceFn({
        left: this,
        right: Emerald(right)
      });
    };

    AbstractFn.prototype.toString = function() {
      var _ref;
      return "" + ((_ref = this.inner) != null ? _ref.toString() : void 0);
    };

    return AbstractFn;

  })(Unit);

  module.exports = AbstractFn;

}).call(this);

},{"sonic/dist/unit":21}],2:[function(require,module,exports){
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

},{"./abstract_fn":1}],3:[function(require,module,exports){
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

},{"./abstract_fn":1}],4:[function(require,module,exports){
(function() {
  var AbstractFn, Big, Constant, DifferenceFn, Emerald, PowerFn, ProductFn, RationalFn, Sonic, SumFn, factory, key, utilities, value, _fn,
    __slice = [].slice;

  Sonic = require('sonic');

  Big = require('big.js');

  factory = require('./factory');

  utilities = require('./utilities');

  AbstractFn = require('./abstract_fn');

  Constant = require('./constant');

  SumFn = require('./sum_fn');

  DifferenceFn = require('./difference_fn');

  ProductFn = require('./product_fn');

  RationalFn = require('./rational_fn');

  PowerFn = require('./power_fn');

  Emerald = factory;

  _fn = (function(_this) {
    return function(key, value) {
      return Emerald[key] = function() {
        var args, obj;
        obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return value.apply(factory(obj), args);
      };
    };
  })(this);
  for (key in utilities) {
    value = utilities[key];
    _fn(key, value);
  }

  Emerald._ = Emerald;

  Emerald.Sonic = Sonic;

  Emerald.Big = Big;

  Emerald.AbstractFn = AbstractFn;

  Emerald.Constant = Constant;

  Emerald.SumFn = SumFn;

  Emerald.DifferenceFn = DifferenceFn;

  Emerald.ProductFn = ProductFn;

  Emerald.RationalFn = RationalFn;

  Emerald.PowerFn = PowerFn;

  module.exports = Emerald;

}).call(this);

},{"./abstract_fn":1,"./constant":2,"./difference_fn":3,"./factory":5,"./power_fn":6,"./product_fn":7,"./rational_fn":8,"./sum_fn":9,"./utilities":10,"big.js":11,"sonic":18}],5:[function(require,module,exports){
(function() {
  var AbstractFn, Constant, factory;

  AbstractFn = require('./abstract_fn');

  Constant = require('./constant');

  factory = function(item) {
    if (item instanceof AbstractFn) {
      return item;
    }
    switch (typeof item) {
      case "number":
        return new Constant(item);
      case "function":
        return new AbstractFn(item);
    }
  };

  module.exports = factory;

}).call(this);

},{"./abstract_fn":1,"./constant":2}],6:[function(require,module,exports){
(function() {
  var AbstractFn, PowerFn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractFn = require('./abstract_fn');

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
      var exp;
      exp = parseFloat(this.exp.evaluate().toPrecision());
      return this.inner.evaluate().pow(exp);
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
      return "(" + inner + ")^" + this.exp;
    };

    return PowerFn;

  })(AbstractFn);

  module.exports = PowerFn;

}).call(this);

},{"./abstract_fn":1}],7:[function(require,module,exports){
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

},{"./abstract_fn":1}],8:[function(require,module,exports){
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

},{"./abstract_fn":1}],9:[function(require,module,exports){
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

},{"./abstract_fn":1}],10:[function(require,module,exports){
(function() {
  var utilities;

  utilities = {};

  module.exports = utilities;

}).call(this);

},{}],11:[function(require,module,exports){
/* big.js v3.0.1 https://github.com/MikeMcl/big.js/LICENCE */
;(function (global) {
    'use strict';

/*
  big.js v3.0.1
  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
  https://github.com/MikeMcl/big.js/
  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
  MIT Expat Licence
*/

/***************************** EDITABLE DEFAULTS ******************************/

    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places of the results of operations
     * involving division: div and sqrt, and pow with negative exponents.
     */
    var DP = 20,                           // 0 to MAX_DP

        /*
         * The rounding mode used when rounding to the above decimal places.
         *
         * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
         * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
         * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
         * 3 Away from zero.                                  (ROUND_UP)
         */
        RM = 1,                            // 0, 1, 2 or 3

        // The maximum value of DP and Big.DP.
        MAX_DP = 1E6,                      // 0 to 1000000

        // The maximum magnitude of the exponent argument to the pow method.
        MAX_POWER = 1E6,                   // 1 to 1000000

        /*
         * The exponent value at and beneath which toString returns exponential
         * notation.
         * JavaScript's Number type: -7
         * -1000000 is the minimum recommended exponent value of a Big.
         */
        TO_EXP_NEG = -7,                   // 0 to -1000000

        /*
         * The exponent value at and above which toString returns exponential
         * notation.
         * JavaScript's Number type: 21
         * 1000000 is the maximum recommended exponent value of a Big.
         * (This limit is not enforced or checked.)
         */
        TO_EXP_POS = 21,                   // 0 to 1000000

/******************************************************************************/

        // The shared prototype object.
        P = {},
        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        Big;


    /*
     * Create and return a Big constructor.
     *
     */
    function bigFactory() {

        /*
         * The Big constructor and exported function.
         * Create and return a new instance of a Big number object.
         *
         * n {number|string|Big} A numeric value.
         */
        function Big(n) {
            var x = this;

            // Enable constructor usage without new.
            if (!(x instanceof Big)) {
                return n === void 0 ? bigFactory() : new Big(n);
            }

            // Duplicate.
            if (n instanceof Big) {
                x.s = n.s;
                x.e = n.e;
                x.c = n.c.slice();
            } else {
                parse(x, n);
            }

            /*
             * Retain a reference to this Big constructor, and shadow
             * Big.prototype.constructor which points to Object.
             */
            x.constructor = Big;
        }

        Big.prototype = P;
        Big.DP = DP;
        Big.RM = RM;

        return Big;
    }


    // Private functions


    /*
     * Return a string representing the value of Big x in normal or exponential
     * notation to dp fixed decimal places or significant digits.
     *
     * x {Big} The Big to format.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
     */
    function format(x, dp, toE) {
        var Big = x.constructor,

            // The index (normal notation) of the digit that may be rounded up.
            i = dp - (x = new Big(x)).e,
            c = x.c;

        // Round?
        if (c.length > ++dp) {
            rnd(x, i, Big.RM);
        }

        if (!c[0]) {
            ++i;
        } else if (toE) {
            i = dp;

        // toFixed
        } else {
            c = x.c;

            // Recalculate i as x.e may have changed if value rounded up.
            i = x.e + i + 1;
        }

        // Append zeros?
        for (; c.length < i; c.push(0)) {
        }
        i = x.e;

        /*
         * toPrecision returns exponential notation if the number of
         * significant digits specified is less than the number of digits
         * necessary to represent the integer part of the value in normal
         * notation.
         */
        return toE === 1 || toE && (dp <= i || i <= TO_EXP_NEG) ?

          // Exponential notation.
          (x.s < 0 && c[0] ? '-' : '') +
            (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
              (i < 0 ? 'e' : 'e+') + i

          // Normal notation.
          : x.toString();
    }


    /*
     * Parse the number or string value passed to a Big constructor.
     *
     * x {Big} A Big number instance.
     * n {number|string} A numeric value.
     */
    function parse(x, n) {
        var e, i, nL;

        // Minus zero?
        if (n === 0 && 1 / n < 0) {
            n = '-0';

        // Ensure n is string and check validity.
        } else if (!isValid.test(n += '')) {
            throwErr(NaN);
        }

        // Determine sign.
        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

        // Decimal point?
        if ((e = n.indexOf('.')) > -1) {
            n = n.replace('.', '');
        }

        // Exponential form?
        if ((i = n.search(/e/i)) > 0) {

            // Determine exponent.
            if (e < 0) {
                e = i;
            }
            e += +n.slice(i + 1);
            n = n.substring(0, i);

        } else if (e < 0) {

            // Integer.
            e = n.length;
        }

        // Determine leading zeros.
        for (i = 0; n.charAt(i) == '0'; i++) {
        }

        if (i == (nL = n.length)) {

            // Zero.
            x.c = [ x.e = 0 ];
        } else {

            // Determine trailing zeros.
            for (; n.charAt(--nL) == '0';) {
            }

            x.e = e - i - 1;
            x.c = [];

            // Convert string to array of digits without leading/trailing zeros.
            for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
            }
        }

        return x;
    }


    /*
     * Round Big x to a maximum of dp decimal places using rounding mode rm.
     * Called by div, sqrt and round.
     *
     * x {Big} The Big to round.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
     * [more] {boolean} Whether the result of division was truncated.
     */
    function rnd(x, dp, rm, more) {
        var u,
            xc = x.c,
            i = x.e + dp + 1;

        if (rm === 1) {

            // xc[i] is the digit after the digit that may be rounded up.
            more = xc[i] >= 5;
        } else if (rm === 2) {
            more = xc[i] > 5 || xc[i] == 5 &&
              (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
        } else if (rm === 3) {
            more = more || xc[i] !== u || i < 0;
        } else {
            more = false;

            if (rm !== 0) {
                throwErr('!Big.RM!');
            }
        }

        if (i < 1 || !xc[0]) {

            if (more) {

                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                x.e = -dp;
                x.c = [1];
            } else {

                // Zero.
                x.c = [x.e = 0];
            }
        } else {

            // Remove any digits after the required decimal places.
            xc.length = i--;

            // Round up?
            if (more) {

                // Rounding up may mean the previous digit has to be rounded up.
                for (; ++xc[i] > 9;) {
                    xc[i] = 0;

                    if (!i--) {
                        ++x.e;
                        xc.unshift(1);
                    }
                }
            }

            // Remove trailing zeros.
            for (i = xc.length; !xc[--i]; xc.pop()) {
            }
        }

        return x;
    }


    /*
     * Throw a BigError.
     *
     * message {string} The error message.
     */
    function throwErr(message) {
        var err = new Error(message);
        err.name = 'BigError';

        throw err;
    }


    // Prototype/instance methods


    /*
     * Return a new Big whose value is the absolute value of this Big.
     */
    P.abs = function () {
        var x = new this.constructor(this);
        x.s = 1;

        return x;
    };


    /*
     * Return
     * 1 if the value of this Big is greater than the value of Big y,
     * -1 if the value of this Big is less than the value of Big y, or
     * 0 if they have the same value.
    */
    P.cmp = function (y) {
        var xNeg,
            x = this,
            xc = x.c,
            yc = (y = new x.constructor(y)).c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {
            return !xc[0] ? !yc[0] ? 0 : -j : i;
        }

        // Signs differ?
        if (i != j) {
            return i;
        }
        xNeg = i < 0;

        // Compare exponents.
        if (k != l) {
            return k > l ^ xNeg ? 1 : -1;
        }

        i = -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;

        // Compare digit by digit.
        for (; ++i < j;) {

            if (xc[i] != yc[i]) {
                return xc[i] > yc[i] ^ xNeg ? 1 : -1;
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
    };


    /*
     * Return a new Big whose value is the value of this Big divided by the
     * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     */
    P.div = function (y) {
        var x = this,
            Big = x.constructor,
            // dividend
            dvd = x.c,
            //divisor
            dvs = (y = new Big(y)).c,
            s = x.s == y.s ? 1 : -1,
            dp = Big.DP;

        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!Big.DP!');
        }

        // Either 0?
        if (!dvd[0] || !dvs[0]) {

            // If both are 0, throw NaN
            if (dvd[0] == dvs[0]) {
                throwErr(NaN);
            }

            // If dvs is 0, throw +-Infinity.
            if (!dvs[0]) {
                throwErr(s / 0);
            }

            // dvd is 0, return +-0.
            return new Big(s * 0);
        }

        var dvsL, dvsT, next, cmp, remI, u,
            dvsZ = dvs.slice(),
            dvdI = dvsL = dvs.length,
            dvdL = dvd.length,
            // remainder
            rem = dvd.slice(0, dvsL),
            remL = rem.length,
            // quotient
            q = y,
            qc = q.c = [],
            qi = 0,
            digits = dp + (q.e = x.e - y.e) + 1;

        q.s = s;
        s = digits < 0 ? 0 : digits;

        // Create version of divisor with leading zero.
        dvsZ.unshift(0);

        // Add zeros to make remainder as long as divisor.
        for (; remL++ < dvsL; rem.push(0)) {
        }

        do {

            // 'next' is how many times the divisor goes into current remainder.
            for (next = 0; next < 10; next++) {

                // Compare divisor and remainder.
                if (dvsL != (remL = rem.length)) {
                    cmp = dvsL > remL ? 1 : -1;
                } else {

                    for (remI = -1, cmp = 0; ++remI < dvsL;) {

                        if (dvs[remI] != rem[remI]) {
                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
                            break;
                        }
                    }
                }

                // If divisor < remainder, subtract divisor from remainder.
                if (cmp < 0) {

                    // Remainder can't be more than 1 digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

                        if (rem[--remL] < dvsT[remL]) {
                            remI = remL;

                            for (; remI && !rem[--remI]; rem[remI] = 9) {
                            }
                            --rem[remI];
                            rem[remL] += 10;
                        }
                        rem[remL] -= dvsT[remL];
                    }
                    for (; !rem[0]; rem.shift()) {
                    }
                } else {
                    break;
                }
            }

            // Add the 'next' digit to the result array.
            qc[qi++] = cmp ? next : ++next;

            // Update the remainder.
            if (rem[0] && cmp) {
                rem[remL] = dvd[dvdI] || 0;
            } else {
                rem = [ dvd[dvdI] ];
            }

        } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if (!qc[0] && qi != 1) {

            // There can't be more than one zero.
            qc.shift();
            q.e--;
        }

        // Round?
        if (qi > digits) {
            rnd(q, dp, Big.RM, rem[0] !== u);
        }

        return q;
    };


    /*
     * Return true if the value of this Big is equal to the value of Big y,
     * otherwise returns false.
     */
    P.eq = function (y) {
        return !this.cmp(y);
    };


    /*
     * Return true if the value of this Big is greater than the value of Big y,
     * otherwise returns false.
     */
    P.gt = function (y) {
        return this.cmp(y) > 0;
    };


    /*
     * Return true if the value of this Big is greater than or equal to the
     * value of Big y, otherwise returns false.
     */
    P.gte = function (y) {
        return this.cmp(y) > -1;
    };


    /*
     * Return true if the value of this Big is less than the value of Big y,
     * otherwise returns false.
     */
    P.lt = function (y) {
        return this.cmp(y) < 0;
    };


    /*
     * Return true if the value of this Big is less than or equal to the value
     * of Big y, otherwise returns false.
     */
    P.lte = function (y) {
         return this.cmp(y) < 1;
    };


    /*
     * Return a new Big whose value is the value of this Big minus the value
     * of Big y.
     */
    P.sub = P.minus = function (y) {
        var i, j, t, xLTy,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.plus(y);
        }

        var xc = x.c.slice(),
            xe = x.e,
            yc = y.c,
            ye = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
        }

        // Determine which is the bigger number.
        // Prepend zeros to equalise exponents.
        if (a = xe - ye) {

            if (xLTy = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }

            t.reverse();
            for (b = a; b--; t.push(0)) {
            }
            t.reverse();
        } else {

            // Exponents equal. Check digit by digit.
            j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

            for (a = b = 0; b < j; b++) {

                if (xc[b] != yc[b]) {
                    xLTy = xc[b] < yc[b];
                    break;
                }
            }
        }

        // x < y? Point xc to the array of the bigger number.
        if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }

        /*
         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
         * as subtraction only needs to start at yc.length.
         */
        if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

            for (; b--; xc[i++] = 0) {
            }
        }

        // Subtract yc from xc.
        for (b = i; j > a;){

            if (xc[--j] < yc[j]) {

                for (i = j; i && !xc[--i]; xc[i] = 9) {
                }
                --xc[i];
                xc[j] += 10;
            }
            xc[j] -= yc[j];
        }

        // Remove trailing zeros.
        for (; xc[--b] === 0; xc.pop()) {
        }

        // Remove leading zeros and adjust exponent accordingly.
        for (; xc[0] === 0;) {
            xc.shift();
            --ye;
        }

        if (!xc[0]) {

            // n - n = +0
            y.s = 1;

            // Result must be zero.
            xc = [ye = 0];
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a new Big whose value is the value of this Big modulo the
     * value of Big y.
     */
    P.mod = function (y) {
        var yGTx,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        if (!y.c[0]) {
            throwErr(NaN);
        }

        x.s = y.s = 1;
        yGTx = y.cmp(x) == 1;
        x.s = a;
        y.s = b;

        if (yGTx) {
            return new Big(x);
        }

        a = Big.DP;
        b = Big.RM;
        Big.DP = Big.RM = 0;
        x = x.div(y);
        Big.DP = a;
        Big.RM = b;

        return this.minus( x.times(y) );
    };


    /*
     * Return a new Big whose value is the value of this Big plus the value
     * of Big y.
     */
    P.add = P.plus = function (y) {
        var t,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.minus(y);
        }

        var xe = x.e,
            xc = x.c,
            ye = y.e,
            yc = y.c;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? y : new Big(xc[0] ? x : a * 0);
        }
        xc = xc.slice();

        // Prepend zeros to equalise exponents.
        // Note: Faster to use reverse then do unshifts.
        if (a = xe - ye) {

            if (a > 0) {
                ye = xe;
                t = yc;
            } else {
                a = -a;
                t = xc;
            }

            t.reverse();
            for (; a--; t.push(0)) {
            }
            t.reverse();
        }

        // Point xc to the longer array.
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }
        a = yc.length;

        /*
         * Only start adding at yc.length - 1 as the further digits of xc can be
         * left as they are.
         */
        for (b = 0; a;) {
            b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
            xc[a] %= 10;
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        if (b) {
            xc.unshift(b);
            ++ye;
        }

         // Remove trailing zeros.
        for (a = xc.length; xc[--a] === 0; xc.pop()) {
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a Big whose value is the value of this Big raised to the power n.
     * If n is negative, round, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     *
     * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
     */
    P.pow = function (n) {
        var x = this,
            one = new x.constructor(1),
            y = one,
            isNeg = n < 0;

        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
            throwErr('!pow!');
        }

        n = isNeg ? -n : n;

        for (;;) {

            if (n & 1) {
                y = y.times(x);
            }
            n >>= 1;

            if (!n) {
                break;
            }
            x = x.times(x);
        }

        return isNeg ? one.div(y) : y;
    };


    /*
     * Return a new Big whose value is the value of this Big rounded to a
     * maximum of dp decimal places using rounding mode rm.
     * If dp is not specified, round to 0 decimal places.
     * If rm is not specified, use Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
     */
    P.round = function (dp, rm) {
        var x = this,
            Big = x.constructor;

        if (dp == null) {
            dp = 0;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!round!');
        }
        rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

        return x;
    };


    /*
     * Return a new Big whose value is the square root of the value of this Big,
     * rounded, if necessary, to a maximum of Big.DP decimal places using
     * rounding mode Big.RM.
     */
    P.sqrt = function () {
        var estimate, r, approx,
            x = this,
            Big = x.constructor,
            xc = x.c,
            i = x.s,
            e = x.e,
            half = new Big('0.5');

        // Zero?
        if (!xc[0]) {
            return new Big(x);
        }

        // If negative, throw NaN.
        if (i < 0) {
            throwErr(NaN);
        }

        // Estimate.
        i = Math.sqrt(x.toString());

        // Math.sqrt underflow/overflow?
        // Pass x to Math.sqrt as integer, then adjust the result exponent.
        if (i === 0 || i === 1 / 0) {
            estimate = xc.join('');

            if (!(estimate.length + e & 1)) {
                estimate += '0';
            }

            r = new Big( Math.sqrt(estimate).toString() );
            r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        } else {
            r = new Big(i.toString());
        }

        i = r.e + (Big.DP += 4);

        // Newton-Raphson iteration.
        do {
            approx = r;
            r = half.times( approx.plus( x.div(approx) ) );
        } while ( approx.c.slice(0, i).join('') !==
                       r.c.slice(0, i).join('') );

        rnd(r, Big.DP -= 4, Big.RM);

        return r;
    };


    /*
     * Return a new Big whose value is the value of this Big times the value of
     * Big y.
     */
    P.mul = P.times = function (y) {
        var c,
            x = this,
            Big = x.constructor,
            xc = x.c,
            yc = (y = new Big(y)).c,
            a = xc.length,
            b = yc.length,
            i = x.e,
            j = y.e;

        // Determine sign of result.
        y.s = x.s == y.s ? 1 : -1;

        // Return signed 0 if either 0.
        if (!xc[0] || !yc[0]) {
            return new Big(y.s * 0);
        }

        // Initialise exponent of result as x.e + y.e.
        y.e = i + j;

        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
        if (a < b) {
            c = xc;
            xc = yc;
            yc = c;
            j = a;
            a = b;
            b = j;
        }

        // Initialise coefficient array of result with zeros.
        for (c = new Array(j = a + b); j--; c[j] = 0) {
        }

        // Multiply.

        // i is initially xc.length.
        for (i = b; i--;) {
            b = 0;

            // a is yc.length.
            for (j = a + i; j > i;) {

                // Current sum of products at this digit position, plus carry.
                b = c[j] + yc[i] * xc[j - i - 1] + b;
                c[j--] = b % 10;

                // carry
                b = b / 10 | 0;
            }
            c[j] = (c[j] + b) % 10;
        }

        // Increment result exponent if there is a final carry.
        if (b) {
            ++y.e;
        }

        // Remove any leading zero.
        if (!c[0]) {
            c.shift();
        }

        // Remove trailing zeros.
        for (i = c.length; !c[--i]; c.pop()) {
        }
        y.c = c;

        return y;
    };


    /*
     * Return a string representing the value of this Big.
     * Return exponential notation if this Big has a positive exponent equal to
     * or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG.
     */
    P.toString = P.valueOf = P.toJSON = function () {
        var x = this,
            e = x.e,
            str = x.c.join(''),
            strL = str.length;

        // Exponential notation?
        if (e <= TO_EXP_NEG || e >= TO_EXP_POS) {
            str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
              (e < 0 ? 'e' : 'e+') + e;

        // Negative exponent?
        } else if (e < 0) {

            // Prepend zeros.
            for (; ++e; str = '0' + str) {
            }
            str = '0.' + str;

        // Positive exponent?
        } else if (e > 0) {

            if (++e > strL) {

                // Append zeros.
                for (e -= strL; e-- ; str += '0') {
                }
            } else if (e < strL) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }

        // Exponent zero.
        } else if (strL > 1) {
            str = str.charAt(0) + '.' + str.slice(1);
        }

        // Avoid '-0'
        return x.s < 0 && x.c[0] ? '-' + str : str;
    };


    /*
     ***************************************************************************
     * If toExponential, toFixed, toPrecision and format are not required they
     * can safely be commented-out or deleted. No redundant code will be left.
     * format is used only by toExponential, toFixed and toPrecision.
     ***************************************************************************
     */


    /*
     * Return a string representing the value of this Big in exponential
     * notation to dp fixed decimal places and rounded, if necessary, using
     * Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toExponential = function (dp) {

        if (dp == null) {
            dp = this.c.length - 1;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!toExp!');
        }

        return format(this, dp, 1);
    };


    /*
     * Return a string representing the value of this Big in normal notation
     * to dp fixed decimal places and rounded, if necessary, using Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toFixed = function (dp) {
        var str,
            x = this,
            neg = TO_EXP_NEG,
            pos = TO_EXP_POS;

        // Prevent the possibility of exponential notation.
        TO_EXP_NEG = -(TO_EXP_POS = 1 / 0);

        if (dp == null) {
            str = x.toString();
        } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
            str = format(x, x.e + dp);

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                str = '-' + str;
            }
        }
        TO_EXP_NEG = neg;
        TO_EXP_POS = pos;

        if (!str) {
            throwErr('!toFix!');
        }

        return str;
    };


    /*
     * Return a string representing the value of this Big rounded to sd
     * significant digits using Big.RM. Use exponential notation if sd is less
     * than the number of digits necessary to represent the integer part of the
     * value in normal notation.
     *
     * sd {number} Integer, 1 to MAX_DP inclusive.
     */
    P.toPrecision = function (sd) {

        if (sd == null) {
            return this.toString();
        } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
            throwErr('!toPre!');
        }

        return format(this, sd - 1, 2);
    };


    // Export


    Big = bigFactory();

    //AMD.
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Big;
        });

    // Node and other CommonJS-like environments that support module.exports.
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Big;

    //Browser.
    } else {
        global.Big = Big;
    }
})(this);

},{}],12:[function(require,module,exports){
(function() {
  var AbstractList, uniqueId;

  uniqueId = require('./unique_id');

  AbstractList = (function() {
    function AbstractList() {
      this._byId = {};
      this._prev = {};
      this._next = {};
      this._handlers = {};
    }

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.has = function(id) {
      return !!id && id in this._byId;
    };

    AbstractList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._prev[id] || null;
    };

    AbstractList.prototype.next = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._next[id] || null;
    };

    AbstractList.prototype.onInvalidate = function(handler) {
      var handlerId;
      handlerId = uniqueId();
      this._handlers[handlerId] = handler;
      return handlerId;
    };

    AbstractList.prototype.removeListener = function(handlerId) {
      if (!this._handlers[handlerId]) {
        return false;
      }
      delete this._handlers[handlerId];
      return true;
    };

    AbstractList.prototype._splice = function(prev, next, first, last) {
      var _next, _prev;
      if (last == null) {
        last = first;
      }
      if (!((prev === 0 || this.has(prev)) || (next === 0 || this.has(next)))) {
        return false;
      }
      while (_next = this._next[_next || prev]) {
        delete this._next[this._prev[_next]];
        delete this._prev[_next];
        if (_next === next) {
          break;
        }
        delete this._byId[_next];
      }
      while (_prev = this._prev[_prev || next]) {
        delete this._prev[this._next[_prev]];
        delete this._next[_prev];
        if (_prev === prev) {
          break;
        }
        delete this._byId[_prev];
      }
      if ((first != null) && (prev != null)) {
        this._next[prev] = first;
        this._prev[first] = prev;
      }
      if ((last != null) && (next != null)) {
        this._prev[next] = last;
        this._next[last] = next;
      }
      this._invalidate(prev, next);
      return true;
    };

    AbstractList.prototype._add = function(value, prev, next) {
      var id;
      id = uniqueId();
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      if (!this._splice(prev, next, id)) {
        return null;
      }
      this._byId[id] = value;
      return id;
    };

    AbstractList.prototype._set = function(id, value) {
      if (!this.has(id)) {
        return false;
      }
      this._byId[id] = value;
      this._invalidate(this._prev[id], this._next[id]);
      return true;
    };

    AbstractList.prototype._delete = function(id) {
      return id !== 0 && this._splice(this._prev[id], this._next[id], this._next[id], this._prev[id]);
    };

    AbstractList.prototype._move = function(id, prev, next) {
      var oldNext, oldPrev;
      if ((oldPrev = this._prev[id]) != null) {
        this._splice(oldPrev, id);
      }
      if ((oldNext = this._next[id]) != null) {
        this._splice(id, oldNext);
      }
      this._splice(oldPrev, oldNext, oldNext, oldPrev);
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      return this._splice(prev, next, id);
    };

    AbstractList.prototype._invalidate = function(prev, next) {
      var handler, id, _ref, _results;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      _ref = this._handlers;
      _results = [];
      for (id in _ref) {
        handler = _ref[id];
        if (handler(prev, next) === false) {
          _results.push(delete this._handlers[id]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return AbstractList;

  })();

  module.exports = AbstractList;

}).call(this);

//# sourceMappingURL=abstract_list.js.map

},{"./unique_id":20}],13:[function(require,module,exports){
(function() {
  var AbstractList, List, Unit, factory;

  AbstractList = require('./abstract_list');

  List = require('./list');

  Unit = require('./unit');

  factory = function(items) {
    if (items instanceof AbstractList) {
      return items;
    } else if (Array.isArray(items)) {
      return new List(items);
    } else if (arguments.length) {
      return new Unit(items);
    } else {
      return new Unit();
    }
  };

  module.exports = factory;

}).call(this);

//# sourceMappingURL=factory.js.map

},{"./abstract_list":12,"./list":17,"./unit":21}],14:[function(require,module,exports){
(function() {
  var AbstractList, FlatMapList, Unit, factory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  factory = require('./factory');

  AbstractList = require('./abstract_list');

  Unit = require('./unit');

  FlatMapList = (function(_super) {
    __extends(FlatMapList, _super);

    function FlatMapList(source, flatMapFn) {
      this._onFlatMapFnInvalidate = __bind(this._onFlatMapFnInvalidate, this);
      this._onListInvalidate = __bind(this._onListInvalidate, this);
      this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
      FlatMapList.__super__.constructor.call(this);
      this._sourceIdById = {};
      this._listBySourceId = {};
      this._source = factory(source);
      this._source.onInvalidate(this._onSourceInvalidate);
      this._flatMapFn = factory(flatMapFn || function(value) {
        return new Unit(value);
      });
      this._flatMapFn.onInvalidate(this._onFlatMapFnInvalidate);
    }

    FlatMapList.prototype.get = function(id) {
      var list;
      if (list = this._getListById(id)) {
        return list.get(id);
      }
    };

    FlatMapList.prototype.has = function(id) {
      return !!id && id in this._sourceIdById;
    };

    FlatMapList.prototype.prev = function(id) {
      var list, prev, sourceId;
      if (id == null) {
        id = 0;
      }
      if (!id) {
        sourceId = this._source.prev();
      } else {
        sourceId = this._sourceIdById[id];
      }
      if (!sourceId) {
        return null;
      }
      list = this._getListBySourceId(sourceId);
      prev = list.prev(id);
      while (!prev) {
        if (!(sourceId = this._source.prev(sourceId))) {
          return null;
        }
        list = this._getListBySourceId(sourceId);
        prev = list.prev();
      }
      this._sourceIdById[prev] = sourceId;
      return prev;
    };

    FlatMapList.prototype.next = function(id) {
      var list, next, sourceId;
      if (id == null) {
        id = 0;
      }
      if (!id) {
        sourceId = this._source.next();
      } else {
        sourceId = this._sourceIdById[id];
      }
      if (!sourceId) {
        return null;
      }
      list = this._getListBySourceId(sourceId);
      next = list.next(id);
      while (!next) {
        if (!(sourceId = this._source.next(sourceId))) {
          return null;
        }
        list = this._getListBySourceId(sourceId);
        next = list.next();
      }
      this._sourceIdById[next] = sourceId;
      return next;
    };

    FlatMapList.prototype._getListBySourceId = function(sourceId) {
      var list;
      if (list = this._listBySourceId[sourceId]) {
        return list;
      }
      if (!this._source.has(sourceId)) {
        return;
      }
      list = this._flatMapFn.last()(this._source.get(sourceId));
      list.onInvalidate((function(_this) {
        return function(prev, next) {
          return _this._onListInvalidate(sourceId, prev, next);
        };
      })(this));
      this._listBySourceId[sourceId] = list;
      return list;
    };

    FlatMapList.prototype._getListById = function(id) {
      return this._getListBySourceId(this._sourceIdById[id]);
    };

    FlatMapList.prototype._onSourceInvalidate = function(sourcePrev, sourceNext) {
      var next, nextList, prev, prevList;
      while (sourcePrev = this._source.prev(sourcePrev)) {
        if (prevList = this._listBySourceId[sourcePrev]) {
          break;
        }
      }
      prev = (prevList != null ? prevList.prev() : void 0) || 0;
      while (sourceNext = this._source.next(sourceNext)) {
        if (nextList = this._listBySourceId[sourceNext]) {
          break;
        }
      }
      next = (nextList != null ? nextList.next() : void 0) || 0;
      this._invalidate(prev, next);
      return true;
    };

    FlatMapList.prototype._onListInvalidate = function(sourceId, prev, next) {
      var list, _ref, _ref1;
      if (!(list = this._listBySourceId[sourceId])) {
        return false;
      }
      prev || (prev = ((_ref = this._getListBySourceId(this._source.prev(sourceId))) != null ? _ref.prev() : void 0) || 0);
      next || (next = ((_ref1 = this._getListBySourceId(this._source.next(sourceId))) != null ? _ref1.next() : void 0) || 0);
      this._invalidate(prev, next);
      return true;
    };

    FlatMapList.prototype._onFlatMapFnInvalidate = function(prev, next) {
      if (!next) {
        this._invalidate();
      }
      return true;
    };

    FlatMapList.prototype._invalidate = function(prev, next) {
      var sourceNext, sourcePrev;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      sourcePrev = this._sourceIdById[prev];
      sourceNext = this._sourceIdById[next];
      while (sourcePrev = this._source.next(sourcePrev)) {
        if (sourcePrev === sourceNext) {
          break;
        }
        delete this._listBySourceId[sourcePrev];
      }
      while (sourceNext = this._source.next(sourceNext)) {
        if (sourceNext === sourcePrev) {
          break;
        }
        delete this._listBySourceId[sourceNext];
      }
      return FlatMapList.__super__._invalidate.call(this, prev, next);
    };

    return FlatMapList;

  })(AbstractList);

  module.exports = FlatMapList;

}).call(this);

//# sourceMappingURL=flat_map_list.js.map

},{"./abstract_list":12,"./factory":13,"./unit":21}],15:[function(require,module,exports){
(function() {
  var FlatMapList, GroupList, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('es6-collections');

  FlatMapList = require('./flat_map_list');

  Unit = require('./unit');

  GroupList = (function(_super) {
    __extends(GroupList, _super);

    function GroupList(source, groupFn) {
      var flatMapFn;
      console.log(JSON.stringify(Object.keys(Map)));
      this._byValue = new Map;
      this._groupFn = groupFn || function(x) {
        return x;
      };
      flatMapFn = function(value) {
        var groupValue, list;
        groupValue = this._groupFn(value);
        if (this._byValue.has(groupValue)) {
          return new Unit();
        }
        list = this._source.filter((function(_this) {
          return function(value) {
            return _this._groupFn(value) === groupValue;
          };
        })(this));
        this._byValue.set(groupValue, list);
        return new Unit(list);
      };
      GroupList.__super__.constructor.call(this, source, flatMapFn);
    }

    return GroupList;

  })(FlatMapList);

  module.exports = GroupList;

}).call(this);

//# sourceMappingURL=group_list.js.map

},{"./flat_map_list":14,"./unit":21,"es6-collections":22}],16:[function(require,module,exports){
(function() {
  var Iterator;

  Iterator = (function() {
    function Iterator(list, startId) {
      this.list = list;
      this.currentId = this.startId = startId;
    }

    Iterator.prototype.current = function() {
      return this.list.get(this.currentId);
    };

    Iterator.prototype.reset = function() {
      this.currentId = this.startId;
      return this;
    };

    Iterator.prototype.moveNext = function() {
      this.currentId = this.list.next(this.currentId);
      return !!this.currentId;
    };

    Iterator.prototype.movePrevious = function() {
      this.currentId = this.list.prev(this.currentId);
      return !!this.currentId;
    };

    Iterator.prototype.next = function() {
      if (this.moveNext()) {
        return {
          value: this.current(),
          done: false,
          id: this.currentId
        };
      } else {
        return {
          done: true,
          id: this.currentId
        };
      }
    };

    Iterator.prototype.previous = function() {
      if (this.movePrevious()) {
        return {
          value: this.current(),
          done: false,
          id: this.currentId
        };
      } else {
        return {
          done: true,
          id: this.currentId
        };
      }
    };

    return Iterator;

  })();

  module.exports = Iterator;

}).call(this);

//# sourceMappingURL=iterator.js.map

},{}],17:[function(require,module,exports){
(function() {
  var AbstractList, List,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require('./abstract_list');

  List = (function(_super) {
    __extends(List, _super);

    function List(values) {
      var value, _i, _len;
      List.__super__.constructor.call(this);
      this._splice(0, 0, 0);
      if (values != null) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          this._add(value, null, 0);
        }
      }
    }

    List.prototype.set = function(id, value) {
      return this._set(id, value);
    };

    List.prototype.push = function(value) {
      return this._add(value, null, 0);
    };

    List.prototype.unshift = function(value) {
      return this._add(value, 0);
    };

    List.prototype.pop = function() {
      var id, value;
      id = this.prev();
      value = this.get(id);
      if (this._delete(id)) {
        return value;
      }
    };

    List.prototype.shift = function() {
      var id, value;
      id = this.next();
      value = this.get(id);
      if (this._delete(id)) {
        return value;
      }
    };

    List.prototype.remove = function(value) {
      var id;
      id = this.idOf(value);
      return this._delete(id);
    };

    List.prototype["delete"] = function(id) {
      return this._delete(id);
    };

    return List;

  })(AbstractList);

  module.exports = List;

}).call(this);

//# sourceMappingURL=list.js.map

},{"./abstract_list":12}],18:[function(require,module,exports){
(function() {
  var AbstractList, FlatMapList, GroupList, Iterator, List, Sonic, TakeList, Unit, factory, fns, uniqueId,
    __slice = [].slice;

  factory = require('./factory');

  uniqueId = require('./unique_id');

  Iterator = require('./iterator');

  AbstractList = require('./abstract_list');

  List = require('./list');

  Unit = require('./unit');

  FlatMapList = require('./flat_map_list');

  GroupList = require('./group_list');

  TakeList = require('./take_list');

  Sonic = factory;

  Sonic.unit = function(item) {
    return new Unit(item);
  };

  Sonic.empty = function() {
    return new Unit();
  };

  Sonic.getIterator = function(list, start) {
    list = Sonic(list);
    return new Iterator(list, start);
  };

  Sonic.each = function(list, fn) {
    list = Sonic(list);
    return Sonic.forEach(list, fn);
  };

  Sonic.forEach = function(list, fn) {
    var iterator;
    list = Sonic(list);
    iterator = Sonic.getIterator(list);
    while (iterator.moveNext()) {
      if (fn(iterator.current(), iterator.currentId) === false) {
        return false;
      }
    }
    return true;
  };

  Sonic.findId = function(list, fn) {
    var result;
    list = Sonic(list);
    result = void 0;
    Sonic.each(list, function(value, id) {
      if (fn(value)) {
        result = id;
        return false;
      }
    });
    return result;
  };

  Sonic.find = function(list, fn) {
    list = Sonic(list);
    return list.get(Sonic.findId(list, fn));
  };

  Sonic.idAt = function(list, index) {
    var i;
    list = Sonic(list);
    i = 0;
    return Sonic.findId(list, function() {
      if (i++ === index) {
        return true;
      }
    });
  };

  Sonic.idOf = function(list, value) {
    list = Sonic(list);
    return Sonic.findId(list, function(v) {
      return v === value;
    });
  };

  Sonic.at = function(list, index) {
    list = Sonic(list);
    return list.get(Sonic.idAt(list, index));
  };

  Sonic.indexOf = function(list, value) {
    var i;
    list = Sonic(list);
    i = -1;
    if (Sonic.some(list, function(v) {
      i++;
      return v === value;
    })) {
      return i;
    } else {
      return -1;
    }
  };

  Sonic.some = function(list, predicate) {
    list = Sonic(list);
    return !Sonic.each(list, function() {
      return !predicate.apply(null, arguments);
    });
  };

  Sonic.any = function(list, predicate) {
    list = Sonic(list);
    return Sonic.some(list, predicate);
  };

  Sonic.contains = function(list, value) {
    list = Sonic(list);
    return Sonic.some(list, function(v) {
      return v === value;
    });
  };

  Sonic.first = function(list) {
    list = Sonic(list);
    return list.get(list.next());
  };

  Sonic.last = function(list) {
    list = Sonic(list);
    return list.get(list.prev());
  };

  Sonic.reduce = function(list, reduceFn, memo) {
    list = Sonic(list);
    Sonic.each(list, function(value, id) {
      return reduceFn(memo, value, id);
    });
    return memo;
  };

  Sonic.flatMap = function(list, flatMapFn) {
    list = Sonic(list);
    return new FlatMapList(list, flatMapFn);
  };

  Sonic.group = function(list, groupFn) {
    list = Sonic(list);
    return new GroupList(list, groupFn);
  };

  Sonic.sort = function(list, sortFn) {
    list = Sonic(list);
    return new SortedList(list, {
      sortFn: sortFn
    });
  };

  Sonic.take = function(list, count) {
    list = Sonic(list);
    return new TakeList(list, count);
  };

  Sonic.map = function(list, mapFn) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(value) {
      return new Unit(mapFn(value));
    });
  };

  Sonic.pluck = function(list, key) {
    list = Sonic(list);
    return Sonic.map(list, function(value) {
      return value[key];
    });
  };

  Sonic.invoke = function() {
    var args, key, list;
    list = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    list = Sonic(list);
    return Sonic.map(list, function(value) {
      return value[key].apply(value, args);
    });
  };

  Sonic.filter = function(list, filterFn) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(value) {
      if (filterFn(value)) {
        return new Unit(value);
      } else {
        return new Unit();
      }
    });
  };

  Sonic.concat = function() {
    var list, lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    list = Sonic(list);
    return Sonic.flatMap(lists, function(list) {
      return list;
    });
  };

  Sonic.flatten = function(list) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(list) {
      return list;
    });
  };

  Sonic.uniq = function(list, groupFn) {
    if (groupFn == null) {
      groupFn = function(x) {
        return x;
      };
    }
    list = Sonic(list);
    return Sonic.flatMap(Sonic.group(list, groupFn), function(list) {
      return list.take(1);
    });
  };

  Sonic.union = function() {
    var list, lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    list = Sonic(list);
    return Sonic.concat.apply(Sonic, lists).uniq();
  };

  Sonic.intersection = function(list, other) {
    list = Sonic(list);
    return Sonic.filter(list, other.contains);
  };

  Sonic.proxy = function(list, fns) {
    var fn, key, proxy;
    if (fns == null) {
      fns = {
        'get': 'get',
        'has': 'has',
        'prev': 'prev',
        'next': 'next',
        'onInvalidate': 'onInvalidate'
      };
    }
    list = Sonic(list);
    proxy = new AbstractList;
    for (key in fns) {
      fn = fns[key];
      proxy[key] = list[fn].bind(list);
    }
    return proxy;
  };

  Sonic.reverse = function(list) {
    var fns, proxy;
    list = Sonic(list);
    fns = {
      'get': 'get',
      'has': 'has',
      'prev': 'next',
      'next': 'prev'
    };
    proxy = Sonic.proxy(list, fns);
    proxy.onInvalidate = function(callback) {
      return list.onInvalidate(function(event) {
        return callback({
          prev: event.next,
          next: event.prev
        });
      });
    };
    return proxy;
  };

  Sonic.toArray = function(list) {
    list = Sonic(list);
    return Sonic.reduce(list, (function(memo, value) {
      return memo.push(value);
    }), []);
  };

  Sonic.uniqueId = uniqueId;

  Sonic.Iterator = Iterator;

  Sonic.AbstractList = AbstractList;

  Sonic.Unit = Unit;

  Sonic.List = List;

  Sonic.FlatMapList = FlatMapList;

  Sonic.GroupList = GroupList;

  Sonic.TakeList = TakeList;

  fns = ['getIterator', 'each', 'forEach', 'at', 'idAt', 'idOf', 'indexOf', 'contains', 'any', 'some', 'find', 'reduce', 'first', 'last', 'toArray', 'flatMap', 'group', 'sort', 'take', 'map', 'pluck', 'invoke', 'filter', 'concat', 'flatten', 'uniq', 'union', 'intersection', 'proxy', 'reverse'];

  fns.forEach(function(fn) {
    return AbstractList.prototype[fn] = function() {
      return Sonic[fn].apply(Sonic, [this].concat(__slice.call(arguments)));
    };
  });

  module.exports = Sonic;

}).call(this);

//# sourceMappingURL=sonic.js.map

},{"./abstract_list":12,"./factory":13,"./flat_map_list":14,"./group_list":15,"./iterator":16,"./list":17,"./take_list":19,"./unique_id":20,"./unit":21}],19:[function(require,module,exports){
(function() {
  var AbstractList, TakeList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require("./abstract_list");

  TakeList = (function(_super) {
    __extends(TakeList, _super);

    function TakeList(source, count) {
      this._indexById = {
        0: 0
      };
      this._source = source;
      this._count = count;
      TakeList.__super__.constructor.call(this);
      this._source.onInvalidate((function(_this) {
        return function(event) {
          return _this._invalidate(event.prev);
        };
      })(this));
      this.onInvalidate((function(_this) {
        return function(event) {
          var id, _results;
          _results = [];
          while (id = _this._source.next(id || event.prev)) {
            _results.push(delete _this._indexById[id]);
          }
          return _results;
        };
      })(this));
    }

    TakeList.prototype.get = function(id) {
      return this._source.get(id);
    };

    TakeList.prototype.has = function(id) {
      return this._source.has(id);
    };

    TakeList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
    };

    TakeList.prototype.next = function(id) {
      var i, next, prev;
      if (id == null) {
        id = 0;
      }
      if ((i = this._indexById[id]) == null) {
        while (prev = this._source.prev(prev || id)) {
          if (i = this._indexById[id]) {
            break;
          }
        }
        while (next = this._source.next(next || prev)) {
          this._indexById[next] = i++;
          if (next === id) {
            break;
          }
        }
      }
      if (i >= this._count) {
        return;
      }
      next = this._source.next(next || id);
      this._indexById[next] = ++i;
      return next;
    };

    return TakeList;

  })(AbstractList);

  module.exports = TakeList;

}).call(this);

//# sourceMappingURL=take_list.js.map

},{"./abstract_list":12}],20:[function(require,module,exports){
(function() {
  var counter;

  counter = 1;

  module.exports = function() {
    return counter++;
  };

}).call(this);

//# sourceMappingURL=unique_id.js.map

},{}],21:[function(require,module,exports){
(function() {
  var List, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  List = require('./list');

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit(value) {
      var values;
      values = arguments.length ? [value] : [];
      Unit.__super__.constructor.call(this, values);
    }

    Unit.prototype.push = function(value) {
      return this._add(value, 0, 0);
    };

    Unit.prototype.unshift = function(value) {
      return this.push(value);
    };

    Unit.prototype.pop = function() {
      var value;
      value = this.last();
      this._splice(0, 0);
      return value;
    };

    Unit.prototype.shift = function() {
      return this.pop();
    };

    return Unit;

  })(List);

  module.exports = Unit;

}).call(this);

//# sourceMappingURL=unit.js.map

},{"./list":17}],22:[function(require,module,exports){
(function (global){
(function (exports) {'use strict';
  //shared pointer
  var i;
  //shortcuts
  var defineProperty = Object.defineProperty, is = function(a,b) { return isNaN(a)? isNaN(b): a === b; };


  //Polyfill global objects
  if (typeof WeakMap == 'undefined') {
    exports.WeakMap = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakMap#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: mapHas,
      // WeakMap#set(key:void*, value:void*):void
      set: sharedSet
    }, true);
  }

  if (typeof Map == 'undefined') {
    exports.Map = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: mapHas,
      // Map#get(key:void*):boolean
      get: sharedGet,
      // Map#set(key:void*, value:void*):void
      set: sharedSet,
      // Map#keys(void):Iterator
      keys: sharedKeys,
      // Map#values(void):Iterator
      values: sharedValues,
      // Map#entries(void):Iterator
      entries: mapEntries,
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
      forEach: sharedForEach,
      // Map#clear():
      clear: sharedClear
    });
  }

  if (typeof Set == 'undefined') {
    exports.Set = createCollection({
      // Set#has(value:void*):boolean
      has: setHas,
      // Set#add(value:void*):boolean
      add: sharedAdd,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#keys(void):Iterator
      keys: sharedValues, // specs actually say "the same function object as the initial value of the values property"
      // Set#values(void):Iterator
      values: sharedValues,
      // Set#entries(void):Iterator
      entries: setEntries,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: sharedSetIterate
    });
  }

  if (typeof WeakSet == 'undefined') {
    exports.WeakSet = createCollection({
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: sharedAdd,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: setHas
    }, true);
  }


  /**
   * ES6 collection constructor
   * @return {Function} a collection class
   */
  function createCollection(proto, objectOnly){
    function Collection(a){
      if (!this || this.constructor !== Collection) return new Collection(a);
      this._keys = [];
      this._values = [];
      this.objectOnly = objectOnly;

      //parse initial iterable argument passed
      if (a) init.call(this, a);
    }

    //define size for non object-only collections
    if (!objectOnly) {
      defineProperty(proto, 'size', {
        get: sharedSize
      });
    }

    //set prototype
    proto.constructor = Collection;
    Collection.prototype = proto;

    return Collection;
  }


  /** parse initial iterable argument passed */
  function init(a){
    var i;
    //init Set argument, like `[1,2,3,{}]`
    if (this.add)
      a.forEach(this.add, this);
    //init Map argument like `[[1,2], [{}, 4]]`
    else
      a.forEach(function(a){this.set(a[0],a[1])}, this);
  }


  /** delete */
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
    }
    // Aurora here does it while Canary doesn't
    return -1 < i;
  };

  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }

  function has(list, key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("Invalid value used as weak collection key");
    //NaN or 0 passed
    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key);){}
    else i = list.indexOf(key);
    return -1 < i;
  }

  function setHas(value) {
    return has.call(this, this._values, value);
  }

  function mapHas(value) {
    return has.call(this, this._keys, value);
  }

  /** @chainable */
  function sharedSet(key, value) {
    this.has(key) ?
      this._values[i] = value
      :
      this._values[this._keys.push(key) - 1] = value
    ;
    return this;
  }

  /** @chainable */
  function sharedAdd(value) {
    if (!this.has(value)) this._values.push(value);
    return this;
  }

  function sharedClear() {
    this._values.length = 0;
  }

  /** keys, values, and iterate related methods */
  function sharedKeys() {
    return sharedIterator(this._keys);
  }

  function sharedValues() {
    return sharedIterator(this._values);
  }

  function mapEntries() {
    return sharedIterator(this._keys, this._values);
  }

  function setEntries() {
    return sharedIterator(this._values, this._values);
  }

  function sharedIterator(array, array2) {
    var j = 0, done = false;
    return {
      next: function() {
        var v;
        if (!done && j < array.length) {
          v = array2 ? [array[j], array2[j]]: array[j];
          j += 1;
        } else {
          done = true;
        }
        return { done: done, value: v };
      }
    };
  }

  function sharedSize() {
    return this._values.length;
  }

  function sharedForEach(callback, context) {
    var self = this;
    var values = self._values.slice();
    self._keys.slice().forEach(function(key, n){
      callback.call(context, values[n], key, self);
    });
  }

  function sharedSetIterate(callback, context) {
    var self = this;
    self._values.slice().forEach(function(value){
      callback.call(context, value, value, self);
    });
  }

})(typeof exports != 'undefined' && typeof global != 'undefined' ? global : window );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[4])(4)
});