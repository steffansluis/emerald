class Series extends Sequence

  constructor: (options = {}) ->
    @_sum = 0
    fn = (value) =>
      sum = Emerald(@_sum).sum(Emerald(value))
      @_sum = sum
      return sum
    options.fn ||= fn
    options.source ||= Emerald.domains.N
    super options

  partialSum: ( index = length) ->
    return @entryAt(index).evaluate()
