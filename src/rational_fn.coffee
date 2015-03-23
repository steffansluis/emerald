AbstractFn = require('./abstract_fn')

class RationalFn extends AbstractFn

  constructor: ( options ) ->
    super options
    @left = Emerald options.left
    @right = Emerald options.right

  evaluate: (left, right) ->
    @left.evaluate().div @right.evaluate()

  toString: () ->
    left = @left.toString()
    right = @right.toString()
    "(#{left}/#{right})"

module.exports = RationalFn
