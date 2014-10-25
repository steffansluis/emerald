describe "export", ->

  it "should export sega to the provided object", ->
    atari = {}
    sega._.factory(atari)

    expect(atari).toEqual(sega)
