module.exports = ( err, req, res, next ) ->
  console.log err
  res.tell err
