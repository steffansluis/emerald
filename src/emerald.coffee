Emerald = ( item ) ->
  if item instanceof AbstractFn
    return item
  else if item instanceof Emerald.Big
    return new Constant item

  switch typeof item
    when "number"
      return new Constant item
    when "function"
      return new AbstractFn item

Emerald.Sonic = Sonic
Emerald.Big = Big
