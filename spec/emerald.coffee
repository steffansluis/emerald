describe "Emerald", ->
  it "should have exported Sonic to Emerald.Sonic", ->
    expect(Emerald.Sonic).toBe(Sonic)

  describe "f", ->
    beforeEach ->
      # console.log JSON.stringify Emerald
      @fn = (x) -> x * 2
      @f = Emerald.f @fn

    # it "should return a curve representing the given function", ->
    #   expect(@f).toBeDefined()
    #   expect(@f.fn).toBe(@fn)

  # describe "function", ->
  #   beforeEach ->
  #     @fn = (x) ->
  #       x^3 + x^2 + 2
