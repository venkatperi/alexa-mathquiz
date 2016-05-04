{App} = require "alexa-express"
s = require './strings'
Quiz = require './Quiz'

app = new App()

app.use ( req, res, next ) ->
  new Quiz req, res
  next()

app.use '/intent/amazon/startOver', ( req, res, next ) ->
  req.context.clear()
  res.ask s.type prefix : s.ok()

# addition, multiplication, subtraction, division
app.use '/intent/setType', ( req, res, next ) ->
  ctx = req.context
  req.context.type req.slot 'Type'
  res.ask s.size prefix : "#{s.ok()}, #{ctx.type()}."

# small, medium, large
setSize = ( req, res, next ) ->
  req.context.size req.slot( 'Size' )
  req.context.start()
  next()

validate = ( req, res, next ) ->
  req.context.validate req.slot 'Answer'
  next()

prompt = ( req, res, next ) ->
  ctx = req.context
  out = []
  if ctx.current() is 1
    out.push s.start count : ctx.count()
  else
    q = if ctx.valid() then s.correct else s.incorrect
    out.push q answer : ctx.prevAnswer()

  if ctx.finished()
    out.push s.done score : ctx.score(), count : ctx.count()
  else
    out.push s.question current : ctx.current(), q : ctx.question()

  res.ask out.join ' '

app.use '/intent/setSize', setSize, prompt

app.use '/intent/answer', validate, prompt

# Error handler
app.use ( err, req, res, next ) ->
  console.log err
  res.tell err

module.exports = app.handler
