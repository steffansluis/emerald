Emerald = ( item ) ->

  # console.log "test", @


  return item if item instanceof AbstractFn

  switch typeof item
    when "number"
      return new Constant item
    when "function"
      return new AbstractFn item

Emerald.Sonic = Sonic
Emerald.Big = Big
