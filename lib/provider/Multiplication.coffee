Provider = require './Provider'
random = require '../util/random'

q = [
  ( e ) -> "What is the product of #{e[ 0 ]} and #{e[ 1 ]}?"
  ( e ) -> "What's #{e[ 0 ]} times #{e[ 1 ]}?"
]

module.exports = class Multiplication extends Provider

  init : =>
    @questions = q
    super()

  answer : ( i ) =>
    e = @list[ i ]
    e[ 0 ] * e[ 1 ]
