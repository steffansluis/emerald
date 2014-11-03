class DifferenceFn extends AbstractFn


  constructor: ( options ) ->
    super options
    @left = Emerald options.left
    @right = Emerald options.right

  evaluate: (left, right) ->
    @left.evaluate().minus @right.evaluate()

  toString: () ->
    left = @left.toString()
    right = @right.toString()
    "(#{left}-#{right})"
