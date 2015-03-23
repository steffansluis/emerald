AbstractFn = require('./abstract_fn')

class Constant extends AbstractFn

  constructor: ( options = {} ) ->
    super options

  integrate: () ->

  evaluate:() ->
    return @inner

module.exports = Constant
