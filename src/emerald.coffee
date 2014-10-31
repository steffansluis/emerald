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

Emerald.domains =
    N: new @Sonic.GeneratedList (list) -> list.toArray().length
Emerald.Sonic = Sonic
Emerald.Big = Big
