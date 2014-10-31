class Sequence extends Emerald.Sonic.MappedList

  Entry: SequenceEntry

  constructor: (options = {}) ->
    source = options.source or Emerald.domains.N
    options.mapFn ||= options.fn or (value) -> value
    super source, options

  sum: ( ) ->
    return new Series(source: @)

  eachEntry: ( fn ) ->
    iterator = @getIterator()
    for i in [1..@length]
      iterator.moveNext()
      return false if fn(iterator.entry) is false
    return true

