Unit      = require('sonic/dist/unit')
Big       = require('big.js')


class Constant extends Unit

  constructor: ( value ) ->
    if value instanceof Big
      @_value = value
    else @_value = Big(value)

    super @

  push: ( value ) ->
    @_value = Big(value)
    super @

  toExponential: -> @_value.toExponential()
  toFixed: -> @_value.toFixed()
  toPrecision: -> @_value.toPrecision()
  toString: () -> return @_value.toString()


  # integrate: () ->

  evaluate:() ->
    return @_value


# Proxy the relevant functions of Big.js to AbstractList
fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub",
"mod", "plus", "add", "pow", "round", "sqrt", "times", "mul"]

fns.forEach ( key ) ->
  factory   = require('./factory')
  Constant::[key] = ( args... ) ->
    res = @_value[key](args...)
    if res instanceof Big
      return factory(res)
    else return res

module.exports = Constant
