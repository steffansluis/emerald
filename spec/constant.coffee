describe "constant", ->

  beforeEach ->
    @number = 8
    @constant = new Emerald.Constant @number

  it "should have set the number as the inner of the constant", ->
    expect(@constant.inner).toBe(@number)
