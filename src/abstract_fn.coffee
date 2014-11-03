class AbstractFn extends Emerald.Sonic.MappedList

  constructor: (options = {}) ->
    if typeof options is "function"
      options.apply(@) unless options instanceof AbstractFn
    else
      if options instanceof AbstractFn
        @inner = options
      else @inner = options.fn or options.value

  power: ( exp ) ->
    options =
      exp: Emerald(exp)
      fn: @

    new PowerFn options

  square: () -> @power(2)
  cube: () -> @power(3)

  product: (right) -> new ProductFn left: @, right: Emerald(right)
  sum: (right) -> new SumFn left: @, right: Emerald(right)

  toString: () ->
    "#{@inner?.toString()}"

