Sonic         =        require('sonic')
Big           =        require('big.js')

factory       =        require('./factory')
utilities     =        require('./utilities')

Vector        =        require('./vector')

AbstractFn    =        require('./abstract_fn')
Constant      =        require('./constant')
SumFn         =        require('./sum_fn')
DifferenceFn  =        require('./difference_fn')
ProductFn     =        require('./product_fn')
RationalFn    =        require('./rational_fn')
PowerFn       =        require('./power_fn')

Emerald = -> factory(arguments...)

Emerald.factory             = factory
Emerald.Sonic               = Sonic
Emerald.Big                 = Big

Emerald.Vector              = Vector

Emerald.AbstractFn          = AbstractFn
Emerald.Constant            = Constant
Emerald.SumFn               = SumFn
Emerald.DifferenceFn        = DifferenceFn
Emerald.ProductFn           = ProductFn
Emerald.RationalFn          = RationalFn
Emerald.PowerFn             = PowerFn

# Proxy the relevant functions of Big.js to Emerald
fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub",
"mod", "plus", "add", "pow", "round", "sqrt", "times", "mul", "toExponential", "toFixed", "toPrecision"]

fns.forEach ( key ) ->
  Emerald[key] = ( value, args... ) -> Emerald.factory(value)[key](args...)

# Proxy all the utility functions to run through factory

for key, value of utilities
  do (key, value) =>
    Emerald[key] = (obj, args...) -> value.apply(Emerald.factory(obj), args)

module.exports = Emerald
