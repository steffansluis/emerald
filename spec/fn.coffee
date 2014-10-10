describe "fn", ->
  beforeEach ->
    @fn = () ->
      @log()
    f = new Emerald.Fn @fn

  it "should apply fn on itself after construction", ->
