class Delta extends Emerald.Sonic.Entry

  constructor: ( value = 1 , options = {}) ->
    super 1, options

  next: ( ) ->
    return @_next ||= new Delta()

  previous: ( ) ->
    return @_previous ||= new Delta()
