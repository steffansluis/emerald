Emerald.factory = ( exports ) ->
  exports._                   = Emerald
  exports.Sonic               = Sonic
  exports.Big                 = Big

  exports.domains             = Emerald.domains

  # Algebra
  exports.AbstractFn          = AbstractFn
  exports.Constant            = Constant
  exports.PowerFn             = PowerFn
  exports.ProductFn           = ProductFn
  exports.RationalFn          = RationalFn
  exports.SumFn               = SumFn
  exports.DifferenceFn        = DifferenceFn

  # Calculus
  exports.SequenceEntry       = SequenceEntry
  exports.Sequence            = Sequence
  exports.Series              = Series
  exports.GeometricSeries     = GeometricSeries

  # Statistics
  exports.Event               = Event
  exports.RandomVariable      = RandomVariable
  exports.Bernoulli           = Bernoulli
  exports.Binomial            = Binomial
  exports.Geometric           = Geometric
  exports.Uniform             = Uniform



  # exports.configure = ( options={} ) ->
  #   for property, value of options
  #     Emerald.config[property] = value
  #   return

# Exports Emerald for CommonJS, AMD and the browser.
if typeof exports == 'object'
  Emerald.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    Emerald.factory(@Emerald = exports)
    return exports
else
  Emerald.factory(@Emerald = Emerald)
