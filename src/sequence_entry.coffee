class SequenceEntry extends Emerald.Sonic.MappedEntry

  evaluate: () ->
    return @value().evaluate()

  toString: () ->
    @toArray.toString()
