'use strict';

var assert = require('assert');
var html = require('htmlparser2').parseDOM;
var nodes = require('./nodes');

module.exports = parse;
function parse(str) {
  var dom = html(str);
  assert(dom.length === 1);
  return parseToken(dom[0]);
}
function parseToken(token) {
  if (token.type === 'tag') {
    return nodes.createNode(
      token.name.toLowerCase(),
      token.attribs,
      token.children.map(parseToken).filter(Boolean)
    );
  } else if (token.type === 'text') {
    if (token.data.trim()) {
      return nodes.createTextNode(token.data.trim());
    }
  }
}
