describe "Domain", ->
  beforeEach ->
    sum = 0
    @fn = (x) ->
      console.log "Mapping function with", x
      x + 1

    @domain = new Emerald.Domain @fn

  it "should work", ->
    iterator = @domain.getIterator()

    n = 10
    for i in [0...n]
      iterator.moveNext()
      console.log(iterator.current())
