describe "PowerFn", ->

  beforeEach ->

  describe "evaluate", ->
    beforeEach ->
      @value1 = new Emerald.Constant(5)
      @value2 = new Emerald.Constant(2)

      @exp1 = Emerald.f(2)
      @exp2 = Emerald.f(3)

      @square = new Emerald.PowerFn exp: @exp1, value: @value1
      @cube = new Emerald.PowerFn exp: @exp2, value: @value2

      @result1 = @square.evaluate()
      @result2 = @cube.evaluate()

      # console.log @square.toString()
      # console.log @cube.toString()


    it "should return the square of the values", ->
      expect(@result1).toEqual(new Emerald.Big Math.pow(5,2))
      expect(@result2).toEqual(new Emerald.Big Math.pow(2,3))


