var App, Quiz, app, prompt, s, setSize, validate;

App = require("alexa-express").App;

s = require('./strings');

Quiz = require('./Quiz');

app = new App();

app.use(function(req, res, next) {
  new Quiz(req, res);
  return next();
});

app.use('/intent/amazon/startOver', function(req, res, next) {
  req.context.clear();
  return res.ask(s.type({
    prefix: s.ok()
  }));
});

app.use('/intent/setType', function(req, res, next) {
  var ctx;
  ctx = req.context;
  req.context.type(req.slot('Type'));
  return res.ask(s.size({
    prefix: "" + (s.ok()) + ", " + (ctx.type()) + "."
  }));
});

setSize = function(req, res, next) {
  req.context.size(req.slot('Size'));
  req.context.start();
  return next();
};

validate = function(req, res, next) {
  req.context.validate(req.slot('Answer'));
  return next();
};

prompt = function(req, res, next) {
  var ctx, out, q;
  ctx = req.context;
  out = [];
  if (ctx.current() === 1) {
    out.push(s.start({
      count: ctx.count()
    }));
  } else {
    q = ctx.valid() ? s.correct : s.incorrect;
    out.push(q({
      answer: ctx.prevAnswer()
    }));
  }
  if (ctx.finished()) {
    out.push(s.done({
      score: ctx.score(),
      count: ctx.count()
    }));
  } else {
    out.push(s.question({
      current: ctx.current(),
      q: ctx.question()
    }));
  }
  return res.ask(out.join(' '));
};

app.use('/intent/setSize', setSize, prompt);

app.use('/intent/answer', validate, prompt);

app.use(function(err, req, res, next) {
  console.log(err);
  return res.tell(err);
});

module.exports = app.handler;
