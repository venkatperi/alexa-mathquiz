s = require '../strings'
module.exports = ( req, res, next ) ->
  ctx = req.context
  req.context.type req.slot 'Type'
  res.ask s.size prefix : "#{s.ok()}, #{ctx.type()}."

