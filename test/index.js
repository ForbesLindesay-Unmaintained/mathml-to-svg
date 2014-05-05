'use strict';

var fs = require('fs');
var render = require('../');

fs.readdirSync(__dirname + '/examples').filter(function (file) {
  return /\.xml$/.test(file);
}).forEach(function (file) {
  var str = fs.readFileSync(__dirname + '/examples/' + file, 'utf8');
  var svg = render(str);
  fs.writeFileSync(__dirname + '/examples/' + file.replace(/\.xml$/, '.svg'), svg);
});