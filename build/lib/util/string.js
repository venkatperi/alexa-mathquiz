var capitalize, endsWith, trimEnd, uncapitalize;

capitalize = function(str) {
  return str[0].toUpperCase() + str.slice(1);
};

uncapitalize = function(str) {
  return str[0].toLowerCase() + str.slice(1);
};

endsWith = function(str, pattern) {
  return str.indexOf(pattern) === str.length - pattern.length;
};

trimEnd = function(str, pattern) {
  if (endsWith(str, pattern)) {
    return str.slice(0, +(-pattern.length - 1) + 1 || 9e9);
  } else {
    return str;
  }
};

module.exports = {
  capitalize: capitalize,
  uncapitalize: uncapitalize,
  endsWith: endsWith,
  trimEnd: trimEnd
};
