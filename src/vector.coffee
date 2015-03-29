FlatMapList      = require('sonic/dist/flat_map_list')
AbstractList     = require('sonic/dist/abstract_list')

# utilities = require('./utilities')

class Vector extends FlatMapList

  constructor: ( values ) ->
    factory   = require('./factory')
    super values, factory

  # toString: () ->
  #   "#{@inner?.toString()}"

# AbstractFn::[key] = value for key, value of utilities


# Proxy the relevant functions of Big.js to AbstractList
fns = ["abs", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "sub",
"mod", "plus", "add", "pow", "round", "sqrt", "times", "mul", "toExponential", "toFixed", "toPrecision"]

fns.forEach ( key ) ->
  AbstractList::[key] = ( args... ) -> @invoke key, args...

module.exports = Vector
