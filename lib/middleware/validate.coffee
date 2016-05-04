module.exports = ( req, res, next ) ->
  req.context.validate req.slot 'Answer'
  next()