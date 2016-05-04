random = require '../util/random'

module.exports = class Provider
  constructor : ( {@min, @max} =  {} ) ->
    @max = 10 unless @max
    @min = 0 unless @min
    @init()

  init : =>

  question : ( i ) =>
    e = @list[ i ]
    idx = random.integer( 0, @questions.length )
    @questions[ idx ]( @list[ i ] )

  generate : ( count ) =>
    @list = []
    while @list.length < count
      e = @entry()
      @list.push e unless @exists e
    @list

  entry : =>
    [ random.integer( @min, @max ), random.integer( @min, @max ) ]

  exists : ( e ) =>
    for h in @list
      return true if h[ 0 ] is e[ 0 ] and h[ 1 ] is e[ 1 ]
      return true if @commutative and h[ 0 ] is e[ 1 ] and h[ 1 ] is e[ 0 ]
