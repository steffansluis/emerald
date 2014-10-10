Emerald.factory = ( exports ) ->
  exports._                   = Emerald
  exports.Sonic               = Sonic

  exports.f                   = Emerald.f

  exports.Fn                  = Fn

  exports.Delta               = Delta
  exports.Generator           = Generator
  exports.AbstractGenerator   = AbstractGenerator

  exports.domains             = Emerald.domains
  # exports.configure = ( options={} ) ->
  #   for property, value of options
  #     Emerald.config[property] = value
  #   return

# Exports Emerald for CommonJS, AMD and the browser.
if typeof exports == 'object'
  Emerald.factory(exports)
else if typeof define == 'function' && define.amd
  define ['exports'], (exports) ->
    Emerald.factory(@Emerald = exports)
    return exports
else
  Emerald.factory(@Emerald = {})
