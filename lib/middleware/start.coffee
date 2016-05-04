s = require '../strings'

module.exports = ( req, res, next ) ->
  req.context.clear()
  res.ask s.type prefix : s.ok()