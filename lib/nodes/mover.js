'use strict';

var assert = require('assert');

module.exports = mover;
function mover(attribs, children) {
  this.attribs = attribs;
  assert(children.length === 2);
  this.top = children[1];
  this.bottom = children[0];
}

mover.prototype.measure = function () {
  this.topDimensions = this.top.measure();
  this.bottomDimensions = this.bottom.measure();
  return {
    width: Math.max(this.topDimensions.width, this.bottomDimensions.width),
    height: this.topDimensions.height + this.bottomDimensions.height
  };
};

mover.prototype.render = function (left, top) {
  var dimensions = this.measure();
  var middle = left + (dimensions.width / 2);
  return this.top.render(
    middle - (this.topDimensions.width / 2),
    top) +
    this.bottom.render(
    middle - (this.bottomDimensions.width / 2),
    top + this.topDimensions.height);
};