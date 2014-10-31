class Bernoulli extends RandomVariable

  constructor: ( options = {} ) ->
    @p = Emerald.f options.p
    super

  f: () ->
    p = @p
    fn = (val) ->
      if val is @source.first()
        p
      else Emerald.f(1).minus(p)
    return fn

