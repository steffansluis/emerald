class Generator extends Emerald.Sonic.AbstractList

  Entry: Delta

  constructor: ( options = {} ) ->
    super options
    @_insert(1, ater: @headEntry, before: @tailEntry)

