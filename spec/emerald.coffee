describe "Emerald", ->
  it "should have exported Sonic to Emerald.Sonic", ->
    expect(Emerald.Sonic).toBe(Sonic)

  describe "f", ->
    beforeEach ->
      # console.log JSON.stringify Emerald
      @fn = () ->
      # @f = Emerald @fn

      f = Emerald(5).square()
      f.power(-3)
      f.product(3)

    it "should return a constant if given a number", ->
      expect(Emerald(2)).toEqual(new Emerald.Constant(2))

    it "should return an AbstractFn if given a function", ->
      expect(Emerald(@fn)).toEqual(new Emerald.AbstractFn(@fn))

    it "should return the Fn if given a type of Fn", ->
      expect(f = Emerald(2)).toEqual(f)


  describe "power", ->
    beforeEach ->
      @power = Emerald(8)
      @base = Emerald(2)
      @f = @base.power(@power)

    it "should return a PowerFn with the given power", ->
      expect(@f).toEqual(new Emerald.PowerFn(exp: @power,fn: @base))

  describe "sum", ->
    beforeEach ->
      @base = Emerald(2)
      @right = Emerald(8)
      @f = @base.sum(@right)

    it "should return a SumFn with the given left and right", ->
      expect(@f).toEqual(new Emerald.SumFn(left: @base,right: @right))

  describe "product", ->
    beforeEach ->
      @base = Emerald(2)
      @right = Emerald(8)
      @f = @base.product(@right)

    it "should return a ProductFn with the given power", ->
      expect(@f).toEqual(new Emerald.ProductFn(left: @base, right: @right))

