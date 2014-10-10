describe "PowerFn", ->

  beforeEach ->

  describe "evaluate", ->
    beforeEach ->
      @value1 = new Emerald.Constant(5)
      @value2 = new Emerald.Constant(2)

      @square = new Emerald.PowerFn exp: 2, fn: @value1
      @cube = new Emerald.PowerFn exp: 3, fn: @value2

      @result1 = @square.evaluate()
      @result2 = @cube.evaluate()

      # console.log @square.toString()
      # console.log @cube.toString()


    it "should return the square of the values", ->
      expect(@result1).toEqual(Math.pow(5,2))
      expect(@result2).toEqual(Math.pow(2,3))


