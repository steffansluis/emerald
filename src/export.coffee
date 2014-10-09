Emerald.factory = ( exports ) ->
    exports._                   = Emerald

# Exports Emerald for CommonJS, AMD and the browser.
if typeof exports == 'object'
  Emerald.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    Emerald.factory(@Emerald = exports)
    return exports
else
  Emerald.factory(@Emerald = {})
