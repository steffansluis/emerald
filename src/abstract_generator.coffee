class AbstractGenerator extends Emerald.Sonic.MappedList

  constructor: ( fn, options ) ->
    @fn = fn

    console.log x for x,v of Emerald

    super Emerald.domains.N(), mapFn: @fn

