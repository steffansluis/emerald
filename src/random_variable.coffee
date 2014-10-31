class RandomVariable extends Sequence

  constructor: (options = {}) ->
    options.fn ||= @f()
    super

  f: () ->
    # Returns the probability mass function for this random variable
    # Sum/Integral of this is always 1

  F: () ->
    # Returns the probability distribution function for this random variable
    # The distribution function F(x) the following properties:
    #   - For a <= b, implies F(a) <= F(b), because a<= implies that {X <= a} is a subset of {X <= B}
    #   - 0 <= F(a) <= 1, for a in {-Infinity,Infinity}
    #   - Any function satisfying this is a distribution function of some random variable
