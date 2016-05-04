should = require( "should" )
assert = require( "assert" )
app = require( '../lib/index' )
path = require 'path'
random = require '../lib/util/random'

merge = ( target, src ) ->
  target[ k ] = v for own k,v of src

txt = ( name ) -> require path.join __dirname, "fixtures", "text", "#{name}.txt"
request = ( name ) -> require path.join __dirname, "fixtures", "request", "#{name}.json"

describe "space geek", ->

  session = {}
  answer = -1
  context = {}

  run = ( name, fn ) ->
    r = request name
    merge r.session.attributes, session
    if r.request.intent.slots?.Answer?
      r.request.intent.slots.Answer.value = session.answer + random.integer(0,2)
    app r, context, ( err, res ) ->
      merge session, res.sessionAttributes
#      console.log JSON.stringify res, null, 2
      fn err, res

  it "start quiz", ( done ) ->
    run "startOver", ( err, res ) ->
      return done err if err?
      done()

  it "set quiz type", ( done ) ->
    run "setType", ( err, res ) ->
      return done err if err?
      done()

  it "set quiz size", ( done ) ->
    run "setSize", ( err, res ) ->
      return done err if err?
      done()

  for i in [ 1..20 ]
    do( i ) ->
      it "answer", ( done ) ->
        run "answer", ( err, res ) ->
          return done err if err?
          done()


 

