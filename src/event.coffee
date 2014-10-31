class Event extends Sonic.FilteredList

  # Does something with sonic list?
  constructor: ( options = {} ) ->
    @universe = options.universe
    options.filterFn ||= options.fn

    super @universe, options

  probability: ( options = {} ) ->
    if C = options.given?
      return @intersection(C).probability() / C.probability()

    return @toArray().length / @universe.toArray().length

  independentOf: ( other... ) ->
    for B in other
      pAB = @probability(given: B)
      return false unless pAB is @probability()
    return true

  union: () ->

  intersection: () ->

  complement: () ->
    fn = @filterFn
    return new Event universe: @universe, fn: (val) -> not fn(val)

  product: ( other... ) ->
    # Powerset
