var Provider, random,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

random = require('../util/random');

module.exports = Provider = (function() {
  function Provider(_arg) {
    var _ref;
    _ref = _arg != null ? _arg : {}, this.min = _ref.min, this.max = _ref.max;
    this.exists = __bind(this.exists, this);
    this.entry = __bind(this.entry, this);
    this.generate = __bind(this.generate, this);
    this.question = __bind(this.question, this);
    this.init = __bind(this.init, this);
    if (!this.max) {
      this.max = 10;
    }
    if (!this.min) {
      this.min = 0;
    }
    this.init();
  }

  Provider.prototype.init = function() {};

  Provider.prototype.question = function(i) {
    var e, idx;
    e = this.list[i];
    idx = random.integer(0, this.questions.length);
    return this.questions[idx](this.list[i]);
  };

  Provider.prototype.generate = function(count) {
    var e;
    this.list = [];
    while (this.list.length < count) {
      e = this.entry();
      if (!this.exists(e)) {
        this.list.push(e);
      }
    }
    return this.list;
  };

  Provider.prototype.entry = function() {
    return [random.integer(this.min, this.max), random.integer(this.min, this.max)];
  };

  Provider.prototype.exists = function(e) {
    var h, _i, _len, _ref;
    _ref = this.list;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      h = _ref[_i];
      if (h[0] === e[0] && h[1] === e[1]) {
        return true;
      }
      if (this.commutative && h[0] === e[1] && h[1] === e[0]) {
        return true;
      }
    }
  };

  return Provider;

})();
