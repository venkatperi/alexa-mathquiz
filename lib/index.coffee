{App} = require "alexa-express"
s = require './strings'
Quiz = require './Quiz'

m = {}
for name in [ 'context', 'start', 'setType', 'setSize', 'validate', 'prompt', 'error' ]
  m[ name ] = require "./middleware/#{name}"

app = new App()

app.use m.context
app.use '/intent/amazon/startOver', m.start
app.use '/intent/setType', m.setType
app.use '/intent/setSize', m.setSize, m.prompt
app.use '/intent/answer', m.validate, m.prompt
app.use m.error

module.exports = app.handler
