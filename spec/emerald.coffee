describe "Emerald", ->
  it "should have exported Sonic to Emerald.Sonic", ->
    expect(Emerald.Sonic).toBe(Sonic)

  describe "curve", ->
    beforeEach ->
      # console.log JSON.stringify Emerald
      @fn = (x) -> x * 2
      @curve = Emerald.f @fn

    it "should return a curve representing the given function", ->
      expect(@curve).toBeDefined()
      expect(@curve.fn).toBe(@fn)
