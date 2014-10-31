class Constant extends AbstractFn

  constructor: ( options ) ->
    if typeof options is "number"
      options = value: new Emerald.Big options
    super options

  integrate: () ->

  evaluate:() ->
    return @inner
