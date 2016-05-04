Quiz = require '../Quiz'
module.exports = ( req, res, next ) ->
  new Quiz req, res
  next()
