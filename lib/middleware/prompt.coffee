s = require '../strings'

module.exports = ( req, res, next ) ->
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
