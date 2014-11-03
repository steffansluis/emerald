class AbstractFn extends Emerald.Sonic.MappedList

  constructor: (options = {}) ->
    if typeof options is "function"
      if options instanceof AbstractFn or options instanceof Emerald.Big
        @inner = options
      else options.apply(@)
    else
      switch typeof options
        when "object"
          @inner = options.inner
        when "number"
          @inner = new Emerald.Big(options)

  power: ( exp ) ->
    options =
      exp: Emerald(exp)
      fn: @

    new PowerFn options

  square: () -> @power(2)
  cube: () -> @power(3)

  sqrt: () -> @power(0.5)
  nroot: (n) -> @power( Emerald(1).over(n) )

  product: (right) -> new ProductFn left: @, right: Emerald(right)
  times: (right) -> @product right
  divide: (right) -> new RationalFn left: @, right: Emerald(right)

  over: (right) -> @divide(right)
  faculty: () ->
    if @inner.evaluate().eq Emerald(0).evaluate()
      return 1
    else return @product(@minus(1).faculty())

  sum: (right) -> new SumFn left: @, right: Emerald(right)
  minus: (right) -> new DifferenceFn left: @, right: Emerald(right)

  toString: () ->
    "#{@inner?.toString()}"

