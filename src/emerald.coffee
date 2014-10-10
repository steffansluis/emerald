Emerald =

  Sonic: Sonic

  domains :
    N: () -> new Sonic.SimpleList([1..100])

  mapFN:
    constant: (x) -> x
    square: (x) -> x * x

  f: ( fn, domains... ) ->
    return new Fn fn, domains
