'use strict';

var parse = require('./lib/parse.js');

module.exports = function (str) {
  var ast = parse(str);
  return ast.render(0, 0);
};