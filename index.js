'use strict';

var parse = require('./lib/parse.js');

module.exports = function (str, options = {}) {
  const ast = parse(str);
  const minFontSize = options.minFontSize || 10;
  const peferredFontSize = options.peferredFontSize || 24;
  const fontLevel = ast.getFontLevel();
  const topLevelFontSize = Math.max(peferredFontSize, minFontSize + (fontLevel * 8));
  return ast.render(0, 0, topLevelFontSize);
};
