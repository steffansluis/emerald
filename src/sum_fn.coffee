AbstractFn = require('./abstract_fn')

class SumFn extends AbstractFn

  constructor: ( options ) ->
    super options
    @left = Emerald options.left
    @right = Emerald options.right

  evaluate: (left, right) ->
    @left.evaluate().plus @right.evaluate()

  toString: () ->
    left = @left.toString()
    right = @right.toString()
    "(#{left}+#{right})"

module.exports = SumFn
