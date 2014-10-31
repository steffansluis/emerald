class Binomial extends RandomVariable

  constructor: (options = {}) ->
    @p = Emerald.f options.p
    @n = Emerald.f options.n

    super

  f: () ->
    p = @p
    n = @n
    fn = (val) ->
      notpk = Emerald.f(1).minus(p).power(n.minus(Emerald.f(val)))
      pk = p.power(val).product(notp)
      return n.faculty().divide(Emerald.f(k).faculty())

    return fn
