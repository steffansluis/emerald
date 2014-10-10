class Aggregator extends Emerald.Sonic.MappedEntry

  value : () ->
    return @_value if @_value?
    # console.log @ is @list.first()
    console.log "source", @source.value(), "in", @id
    if previous = @previous()
      first = @list.headEntry.next()
      if @ is first
        console.log "first"
        return @_value = @list.mapFn @source.value()
      else
        console.log "Other", previous is first
        # @_previous.value()
        # return @_value ||= @list.mapFn previous.value()
      # console.log "map", @_value
      # console.log "previous", previous
      # return @_value
