Emerald =

  Sonic: Sonic

  domains :
    N: () -> new Domain (x) -> x + 1

  f: ( fn ) ->
    return fn if fn instanceof AbstractFn

    switch typeof fn
      when "number"
        return new Constant fn
      when "function"
        return new AbstractFn fn

