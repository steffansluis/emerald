class Series extends Sequence

  constructor: (options = {}) ->
    @_sum = 0
    fn = (value) =>
      sum = Emerald.f(@_sum).sum(Emerald.f(value))
      @_sum = sum
      return sum
    options.fn ||= fn
    options.source ||= Emerald.domains.N
    super options

  partialSum: ( index = length) ->
    return @entryAt(index).evaluate()
