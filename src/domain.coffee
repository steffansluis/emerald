class Domain extends Emerald.Sonic.MappedList

  Entry: Aggregator

  constructor: ( options = {} ) ->
    if typeof options is "function"
      options = mapFn: options
    @generator = options.generator or new Generator()
    super @generator, options


