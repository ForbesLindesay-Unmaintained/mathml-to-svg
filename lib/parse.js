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
    if (!(token.name.toLowerCase() in nodes)) {
      // todo: remove this once all the elements are implemented.
      return new nodes.text(token.name.toLowerCase());
      throw new Error('Unexpected node type "' + token.name.toLowerCase() + '"');
    }
    return new nodes[token.name.toLowerCase()](
      token.attribs,
      token.children.map(parseToken).filter(Boolean));
  } else if (token.type === 'text') {
    if (token.data.trim()) {
      return new nodes.text(token.data.trim());
    }
  }
}