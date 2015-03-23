Sonic =        require('sonic')
Big   =        require('big.js')

Emerald = ( item ) ->
  # if item instanceof AbstractFn
  #   return item
  # else if item instanceof Emerald.Big
  #   return new Constant item

  # switch typeof item
  #   when "number"
  #     return new Constant item
  #   when "function"
  #     return new AbstractFn item

Emerald._                   = Emerald
Emerald.Sonic               = Sonic
Emerald.Big                 = Big
# Emerald.AbstractFn          = AbstractFn
# Emerald.Constant            = Constant
# Emerald.PowerFn             = PowerFn
# Emerald.ProductFn           = ProductFn
# Emerald.RationalFn          = RationalFn
# Emerald.SumFn               = SumFn
# Emerald.DifferenceFn        = DifferenceFn

module.exports = Emerald
