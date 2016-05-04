MAX_INT = 9007199254740992
MIN_INT = -MAX_INT

random = -> Math.random()

integer = ( min, max ) ->
  max = MAX_INT if arguments.length < 2
  min = MIN_INT if arguments.length < 1
  Math.floor( random() * (max - min) ) + min

module.exports =
  random : random
  integer : integer
  