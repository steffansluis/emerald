Emerald =

  Sonic: Sonic
  Big: Big

  f: ( fn ) ->
    return fn if fn instanceof AbstractFn

    switch typeof fn
      when "number"
        return new Constant fn
      when "function"
        return new AbstractFn fn

