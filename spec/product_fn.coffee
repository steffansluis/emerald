describe "ProductFn", ->

  beforeEach ->

  describe "evaluate", ->
    beforeEach ->
      @left = new Emerald.Constant 2
      @right = new Emerald.Constant 4
      @product = new Emerald.ProductFn left: @left, right: @right

      @result = @product.evaluate()

    it "should return the product of the left and right value", ->
      expect(@result).toBe(8)
