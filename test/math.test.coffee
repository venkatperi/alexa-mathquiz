should = require( "should" )
assert = require( "assert" )
path = require 'path'
provider = require '../lib/provider'

txt = ( name ) -> require path.join __dirname, "fixtures", "text", "#{name}.txt"
request = ( name ) -> require path.join __dirname, "fixtures", "request", "#{name}.json"

describe "math", ->

  describe "addition", ->

    it "entry", ( done ) ->
      addition = new provider.Addition()
#      console.log addition.generate(80)

      done()



