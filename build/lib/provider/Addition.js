var Addition, Provider, q, random,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Provider = require('./Provider');

random = require('../util/random');

q = [
  function(e) {
    return "What is the sum of " + e[0] + " and " + e[1] + "?";
  }, function(e) {
    return "What's " + e[0] + " plus " + e[1] + "?";
  }
];

module.exports = Addition = (function(_super) {
  __extends(Addition, _super);

  function Addition() {
    this.answer = __bind(this.answer, this);
    this.init = __bind(this.init, this);
    return Addition.__super__.constructor.apply(this, arguments);
  }

  Addition.prototype.init = function() {
    this.questions = q;
    return Addition.__super__.init.call(this);
  };

  Addition.prototype.answer = function(i) {
    var e;
    e = this.list[i];
    return e[0] + e[1];
  };

  return Addition;

})(Provider);
