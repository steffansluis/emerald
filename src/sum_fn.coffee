class SumFn extends AbstractFn


  constructor: ( options ) ->
    if typeof options is "number"
      options = right: new Constant(options)
    super options
    @left = options.left
    @right = options.right

  evaluate: (left, right) ->
    @left.evaluate().plus @right.evaluate()

  toString: () ->
    left = @left.toString()
    right = @right.toString()
    "(#{left}+#{right})"
