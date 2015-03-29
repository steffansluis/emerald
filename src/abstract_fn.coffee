List      = require('sonic/dist/list')

utilities = require('./utilities')

class AbstractFn extends List

  constructor: (options = {}) ->
    if typeof options is "function"
      if options instanceof AbstractFn or options instanceof Emerald.Big
        @inner = options
      else options.apply(@)
    else
      switch typeof options
        when "object"
          @inner = options.inner
        when "number"
          @inner = new Emerald.Big(options)

  toString: () ->
    "#{@inner?.toString()}"

# AbstractFn::[key] = value for key, value of utilities

module.exports = AbstractFn
