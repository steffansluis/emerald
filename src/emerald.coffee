Sonic         =        require('sonic')
Big           =        require('big.js')

factory       =        require('./factory')
utilities     =        require('./utilities')

AbstractFn    =        require('./abstract_fn')
Constant      =        require('./constant')
SumFn         =        require('./sum_fn')
DifferenceFn  =        require('./difference_fn')
ProductFn     =        require('./product_fn')
RationalFn    =        require('./rational_fn')
PowerFn       =        require('./power_fn')

Emerald = factory

for key, value of utilities
  do (key, value) =>
    Emerald[key] = (obj, args...) -> value.apply(factory(obj), args)

Emerald._                   = Emerald
Emerald.Sonic               = Sonic
Emerald.Big                 = Big

Emerald.AbstractFn          = AbstractFn
Emerald.Constant            = Constant
Emerald.SumFn               = SumFn
Emerald.DifferenceFn        = DifferenceFn
Emerald.ProductFn           = ProductFn
Emerald.RationalFn          = RationalFn
Emerald.PowerFn             = PowerFn

module.exports = Emerald
