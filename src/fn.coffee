class Fn

  constructor: (fn, domains) ->
    @fn = fn
    @domains = domains

    @fn.apply(@) unless fn instanceof Fn

    # if fn instanceof Fn
    #   handles = fn.hanldes
    # else
    #   for domain in domains
    #     handle = domain.createHandle()
    #     hanldes.push handle

    # @hanldes = new Emerald.Sonic.MappedList handles

  evaluate:(values...) ->
    return unless values.length is @domains.length

    return values

  square: () ->
    options =
      power: 2

    new PowerFn @, @domains, options

  differentiate: ( ) ->
    mapFns = Emerald.mapFn

    switch @mapFn
      when mapFns.constant
        return 1
      when mapFns.square

        return Emerald.f
