describe "Emerald", ->
  it "should have exported Sonic to Emerald.Sonic", ->
    expect(Emerald.Sonic).toBe(Sonic)

  describe "f", ->
    beforeEach ->
      # console.log JSON.stringify Emerald
      @fn = () ->
      # @f = Emerald.f @fn

      f = Emerald.f(5).square()
      f.power(-3)
      f.product(3)

    it "should return a constant if given a number", ->
      expect(Emerald.f(2)).toEqual(new Emerald.Constant(2))

    it "should return an AbstractFn if given a function", ->
      expect(Emerald.f(@fn)).toEqual(new Emerald.AbstractFn(@fn))

    it "should return the Fn if given a type of Fn", ->
      expect(f = Emerald.f(2)).toEqual(f)


  describe "power", ->
    beforeEach ->
      @power = 8
      @base = Emerald.f(2)
      @f = @base.power(@power)

    it "should return a PowerFn with the given power", ->
      expect(@f).toEqual(new Emerald.PowerFn(exp: 8,fn: @base))

  describe "sum", ->
    beforeEach ->
      @base = Emerald.f(2)
      @right = 8
      @f = @base.sum(@right)

    it "should return a SumFn with the given left and right", ->
      expect(@f).toEqual(new Emerald.SumFn(left: @base,right: 8))

  describe "product", ->
    beforeEach ->
      @base = Emerald.f(2)
      @right = 8
      @f = @base.product(@right)

    it "should return a ProductFn with the given power", ->
      expect(@f).toEqual(new Emerald.ProductFn(left: @base, right: 8))

