utilities = {
  # power: ( exp ) ->
  #   factory = require('./factory')
  #   PowerFn = require('./power_fn')

  #   options =
  #     exp: factory(exp)
  #     fn: @

  #   new PowerFn options

  # square: () -> @power(2)

  # cube: () -> @power(3)

  # sqrt: () -> @power(0.5)

  # nroot: (n) -> @power( factory(1).over(n) )

  # product: (right) ->
  #   factory = require('./factory')
  #   ProductFn = require('./product_fn')

  #   new ProductFn left: @, right: factory(right)

  # times: (right) -> @product right

  # divide: (right) ->
  #   factory = require('./factory')
  #   RationalFn = require('./rational_fn')

  #   new RationalFn left: @, right: factory(right)

  # over: (right) -> @divide(right)

  # faculty: () ->
  #   if @inner.evaluate().eq factory(0).evaluate()
  #     return 1
  #   else return @product(@minus(1).faculty())

  # sum: (right) ->
  #   factory = require('./factory')
  #   SumFn = require('./sum_fn')

  #   new SumFn left: @, right: factory(right)

  # minus: (right) ->
  #   factory = require('./factory')
  #   DifferenceFn = require('./difference_fn')

  #   new DifferenceFn left: @, right: factory(right)

}

module.exports = utilities
