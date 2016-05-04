var App, app, facts, randomFact, s;

App = require("alexa-express");

facts = require('./facts');

s = require('./strings');

app = new App();

app.use(function(req, res, next) {
  console.log("" + (req["new"] ? 'new session:' : void 0) + " requestId: " + req.requestId + ", sessionId: " + req.sessionId);
  console.log("url: " + req.url);
  return next();
});

app.use("/intent/getNewFact", function(req, res, next) {
  return res.tell(s.fact(randomFact()));
});

app.use("/intent/amazon/help", function(req, res, next) {
  return res.ask(s.help());
});

app.use("/intent/amazon/stop", function(req, res, next) {
  return res.tell(s.goodbye());
});

app.use("/intent/amazon/cancel", function(req, res, next) {
  return res.tell(s.goodbye());
});

app.use(function(req, res, next, err) {
  console.log(err);
  return res.tell(err);
});

randomFact = function() {
  return facts[Math.floor(Math.random() * facts.length)];
};

module.exports = app.handler;
