class Geometric extends RandomVariable

  constructor: (options = {}) ->
    @p = Emerald.f options.p

    super

  f: () ->
    p = @p
    fn = (val) ->
      Emerald.f(1).minus(p).power(Emerald.f(val)).product(p)
    return fn
