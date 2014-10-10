class PowerFn extends AbstractFn


  constructor: ( options = {} ) ->
    if typeof options is "number"
      options = exp: options
    super options
    @exp = options.exp

  evaluate: () ->
    Math.pow(@inner.evaluate(), @exp)

  integrate:() ->
    primitive = @inner.intergrate().divide(@exp)
    primitive.exp++

    return primitive


  toString: () ->
    inner = @inner.toString()
    "(#{inner})^#{@power}"
