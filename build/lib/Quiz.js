var Provider, Quiz, SessionContext, fields, sizes, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('./util/string');

SessionContext = require('alexa-express').SessionContext;

Provider = require('./provider');

fields = {
  started: void 0,
  finished: void 0,
  score: void 0,
  valid: void 0,
  current: void 0,
  questions: void 0,
  question: void 0,
  answer: void 0,
  prevAnswer: void 0,
  count: void 0,
  type: function(v) {
    if (v != null) {
      return _.capitalize(v.toLowerCase());
    } else {
      return v;
    }
  },
  size: function(v) {
    return v != null ? v.toLowerCase() : void 0;
  }
};

sizes = {
  small: 20,
  medium: 40,
  large: 60,
  huge: 80
};

module.exports = Quiz = (function(_super) {
  __extends(Quiz, _super);

  function Quiz() {
    this.validate = __bind(this.validate, this);
    this.onCurrentChanged = __bind(this.onCurrentChanged, this);
    this.next = __bind(this.next, this);
    this.start = __bind(this.start, this);
    this.createProvider = __bind(this.createProvider, this);
    this.onSizeChanged = __bind(this.onSizeChanged, this);
    this.clear = __bind(this.clear, this);
    this.init = __bind(this.init, this);
    return Quiz.__super__.constructor.apply(this, arguments);
  }

  Quiz.prototype.init = function() {
    var k, v;
    this.on("changed:size", this.onSizeChanged);
    this.on("changed:current", this.onCurrentChanged);
    for (k in fields) {
      if (!__hasProp.call(fields, k)) continue;
      v = fields[k];
      this.fields[k] = v;
    }
    Quiz.__super__.init.call(this);
    if (this.started()) {
      this.createProvider();
      return this.provider.list = this.questions();
    }
  };

  Quiz.prototype.clear = function() {
    this.started(false);
    this.finished(false);
    this.current(1);
    this.score(0);
    this.answer(0);
    this.type('addition');
    return this.size('medium');
  };

  Quiz.prototype.onSizeChanged = function(value) {
    return this.count(sizes[value]);
  };

  Quiz.prototype.createProvider = function() {
    return this.provider = new Provider[this.type()]();
  };

  Quiz.prototype.start = function() {
    if (this.started()) {
      return;
    }
    this.createProvider();
    this.questions(this.provider.generate(this.count()));
    this.current(1);
    return this.started(true);
  };

  Quiz.prototype.next = function() {
    var c, count;
    c = this.current() + 1;
    count = this.count();
    if (c <= count) {
      return this.current(c);
    } else {
      return this.finished(true);
    }
  };

  Quiz.prototype.onCurrentChanged = function(value) {
    if (this.provider == null) {
      return;
    }
    this.question(this.provider.question(value - 1));
    this.prevAnswer(this.answer());
    return this.answer(this.provider.answer(value - 1));
  };

  Quiz.prototype.validate = function(ans) {
    if (this.finished()) {
      return;
    }
    this.valid(ans === this.answer());
    if (this.valid()) {
      this.score(this.score() + 1);
    }
    return this.next();
  };

  return Quiz;

})(SessionContext);
