'use strict';

var assert = require('assert');
var fs = require('fs');
var render = require('../');

fs.readdirSync(__dirname + '/examples').filter(function (file) {
  return /\.xml$/.test(file);
}).forEach(function (file) {
  var str = fs.readFileSync(__dirname + '/examples/' + file, 'utf8');
  var svg = render(str);
  if (process.env.CI) {
    const expected = fs.readFileSync(__dirname + '/examples/' + file.replace(/\.xml$/, '.svg'));
    assert.equal(svg, expected);
  } else {
    fs.writeFileSync(__dirname + '/examples/' + file.replace(/\.xml$/, '.svg'), svg);
  }
});

if (process.env.CI) {
  console.log('tests passed');
} else {
  console.log('tests updated');
}
