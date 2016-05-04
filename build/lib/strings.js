var question, str, x;

x = function(v) {
  if (v != null) {
    return v;
  } else {
    return "";
  }
};

str = function(opts, s) {
  if (opts == null) {
    opts = {};
  }
  return "" + (x(opts.prefix)) + " " + s + " " + (x(opts.postfix));
};

question = function(opts) {
  return str(opts, "Question " + opts.current + ": " + opts.q);
};

module.exports = {
  ok: function(opts) {
    return str(opts, "Ok. Let's get started.");
  },
  type: function(opts) {
    return str(opts, "Quiz for what?");
  },
  size: function(opts) {
    return str(opts, "How long?");
  },
  time: function(opts) {
    return str(opts, "How long should I wait for each answer?");
  },
  mode: function(opts) {
    return str(opts, "Do you want feedback for each answer?");
  },
  start: function(opts) {
    return str(opts, "Ok, " + opts.count + " questions. Let's start. ");
  },
  question: function(opts) {
    return str(opts, "Question " + opts.current + ": " + opts.q);
  },
  correct: function(opts) {
    return str(opts, "Correct.");
  },
  incorrect: function(opts) {
    return str(opts, "Oops. The correct answer is " + opts.answer + ".");
  },
  done: function(opts) {
    return str(opts, "Ok, that's it. You got " + opts.score + " correct out of " + opts.count + ".");
  }
};
