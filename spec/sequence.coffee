describe "Sequence", ->
  # beforeEach ->
    # @fn = (list) -> list.length

    # @seq = new Emerald.Sequence @fn
  beforeEach ->
    @g = new Emerald.Sequence()
    @gen = @g.getIterator()
    # @gen.moveNext()

  it "should work", ->
    console.log @gen.entry.value()
    for i in [1...10]
      @gen.moveNext()
      console.log @gen.entry.value()

    console.log @g.toArray()

  describe "constructor", ->
    it "should set any relevant attributes", ->
      # console.log @seq.toArray()
  # describe "evaluate", ->
  #   beforeEach ->
  #     @values = [1,2,3]
  # #     @results = @seq.evaluate(@values...)

  #   it "should return the values", ->
  #     expect(@results).toEqual(@values)


