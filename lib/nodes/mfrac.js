'use strict';

var assert = require('assert');

module.exports = mfrac;
function mfrac(attribs, children) {
  this.attribs = attribs;
  assert(children.length === 2);
  this.top = children[0];
  this.bottom = children[1];
}

mfrac.prototype.measure = function () {
  this.topDimensions = this.top.measure();
  this.bottomDimensions = this.bottom.measure();
  return {
    width: Math.max(this.topDimensions.width, this.bottomDimensions.width),
    height: Math.max(this.topDimensions.height, this.bottomDimensions.height) * 2 + 10
  };
};

mfrac.prototype.render = function (left, top) {
  var dimensions = this.measure();
  var middle = left + (dimensions.width / 2);
  var middleY = top + (dimensions.height / 2);
  return this.top.render(
    middle - (this.topDimensions.width / 2),
    top) +
    '<line x1="' + left + '" x2="' + (left + dimensions.width) +
    '" y1="' + middleY + '" y2="' + middleY + '" style="stroke:#000000;"/>' +
    this.bottom.render(
    middle - (this.bottomDimensions.width / 2),
    top + this.topDimensions.height + 10);
};
