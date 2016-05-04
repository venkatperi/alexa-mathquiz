module.exports = ( req, res, next ) ->
  req.context.size req.slot( 'Size' )
  req.context.start()
  next()

