describe "SumFn", ->

  beforeEach ->

  describe "evaluate", ->
    beforeEach ->
      @left = new Emerald.Constant 2
      @right = new Emerald.Constant 6
      @product = new Emerald.SumFn left: @left, right: @right

      @result = @product.evaluate()

    it "should return the product of the left and right value", ->
      expect(@result).toBe(8)
