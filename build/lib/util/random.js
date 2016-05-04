var MAX_INT, MIN_INT, integer, random;

MAX_INT = 9007199254740992;

MIN_INT = -MAX_INT;

random = function() {
  return Math.random();
};

integer = function(min, max) {
  if (arguments.length < 2) {
    max = MAX_INT;
  }
  if (arguments.length < 1) {
    min = MIN_INT;
  }
  return Math.floor(random() * (max - min)) + min;
};

module.exports = {
  random: random,
  integer: integer
};
