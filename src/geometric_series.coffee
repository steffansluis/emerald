class GeometricSeries extends Sequence

  constructor: (options = {}) ->
    @a = Emerald.f options.a
    @r = Emerald.f options.r
    fn = (value) =>
      val = @a.product(@r.power(value))
      return val
    options.fn = fn
    super options

  partialSum: ( index = length) ->
    return @entryAt(index).evaluate()
