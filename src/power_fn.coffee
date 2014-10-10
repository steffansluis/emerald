class PowerFn extends Fn


  consctructor: (fn, domains, options) ->
    super
    @power = options.power

  evaluate:(values...) ->

