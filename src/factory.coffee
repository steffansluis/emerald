
factory = ( item ) ->
  Constant   = require('./constant')
  Vector     = require('./vector')
  AbstractFn = require('./abstract_fn')
  Big        = require('big.js')

  return item if item instanceof Constant or
    item instanceof Vector or
    item instanceof AbstractFn

  if typeof item is "number" or item instanceof Big
    return new Constant item
  else if item instanceof Array
      return new Vector item
  else if typeof item is "function"
      return new AbstractFn item

module.exports = factory
