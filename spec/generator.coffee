describe "Generator", ->

  it "should work", ->

    generator = new Emerald.Generator
    iterator = generator.getIterator()

    n = 10
    for i in [0...n]
      iterator.moveNext()
      console.log(iterator.current())
