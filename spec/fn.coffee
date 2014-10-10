describe "AbstractFn", ->
  beforeEach ->
    @fn = jasmine.createSpy()
    @f = new Emerald.AbstractFn @fn

  it "should apply fn on itself after construction", ->
    expect(@fn).toHaveBeenCalled()


  # describe "evaluate", ->
  #   beforeEach ->
  #     @values = [1,2,3]
  # #     @results = @f.evaluate(@values...)

  #   it "should return the values", ->
  #     expect(@results).toEqual(@values)


