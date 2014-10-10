class Constant extends AbstractFn

  constructor: ( options ) ->
    if typeof options is "number"
      options = value: options
    super options

  integrate: () ->

  evaluate:() ->
    return @inner
