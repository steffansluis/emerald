class Uniform extends RandomVariable

  constructor: (options = {}) ->
    @a = Emerald.f options.a
    @b = Emerald.f options.b

    super

  f: () ->
    a = @a
    b = @b
    fn = (val) ->
      Emerald.f(1).divide(b.minus(a))
    return fn
