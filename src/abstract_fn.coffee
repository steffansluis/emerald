class AbstractFn extends Emerald.Sonic.MappedList

  constructor: (options = {}) ->
    if typeof options is "function"
      options.apply(@) unless options instanceof AbstractFn
    else
      if options instanceof AbstractFn
        @inner = options
      else @inner = options.fn or options.value

    # The handle serves as an abstract interface to the domain
    @from = {}
    for key, value in options.from or Emerald.domains.N()
      @from[key] = value.createHandle()

    @to = {}
    for key, value in options.to or Emerald.domains.N()
      @to[key] = value.createHandle()

    # super @generator, mapFn:

    # @hanldes = new Emerald.Sonic.MappedList handles

  # evaluate: (values...) ->
    # return unless values.length is @domains.length
    # @fn.evaluate(values...)

  power: ( exp ) ->
    options =
      exp: exp
      fn: @

    new PowerFn options

  square: () -> @power(2)
  cube: () -> @power(3)

  product: (right) -> new ProductFn left: @, right: right
  sum: (right) -> new SumFn left: @, right: right

  toString: () ->
    "#{@inner?.toString()}"

