describe "RationalFn", ->

  beforeEach ->

  describe "evaluate", ->
    beforeEach ->
      @left = new Emerald.Constant 2
      @right = new Emerald.Constant 4
      @product = new Emerald.RationalFn left: @left, right: @right

      @result = @product.evaluate()

    it "should return the product of the left and right value", ->
      expect(@result).toEqual(Emerald.Big(0.5))
