sega.factory = ( exports ) ->
    exports._ = sega

# Exports sega for CommonJS, AMD and the browser.
if typeof exports == 'object'
  sega.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    sega.factory(@sega = exports)
    return exports
else
  sega.factory(@sega = {})


