AbstractFn =         require('./abstract_fn')
Constant   =         require('./constant')

factory = ( item ) ->
  if item instanceof AbstractFn
    return item

  switch typeof item
    when "number"
      return new Constant item
    when "function"
      return new AbstractFn item

module.exports = factory
