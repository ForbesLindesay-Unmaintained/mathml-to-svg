'use strict';

var assert = require('assert');

module.exports = msqrt;
function msqrt(attribs, children) {
  this.attribs = attribs;
  assert(children.length === 1);
  this.body = children[0];
  this.bodyDimensions = this.body.measure();
}

msqrt.prototype.measure = function () {
  return {
    width: this.bodyDimensions.width + 20,
    height: Math.max(this.bodyDimensions.height + 10, 30)
  };
};

msqrt.prototype.render = function (left, top) {
  var dimensions = this.measure();
  var bottom = top + dimensions.height;
  var right = left + dimensions.width;
  var p1 = {x: left, y: bottom - 20};
  var p2 = {x: left + 10, y: bottom - 10};
  var p3 = {x: left + 20, y: 5};
  var p4 = {x: right, y: 5};
  return this.body.render(
    left + 20,
    top = 10
  ) +
  '<line x1="' + p1.x + '" x2="' + p2.x + '" y1="' + p1.y + '" y2="' + p2.y + '" style="stroke:#000000;"/>' +
  '<line x1="' + p2.x + '" x2="' + p3.x + '" y1="' + p2.y + '" y2="' + p3.y + '" style="stroke:#000000;"/>' +
  '<line x1="' + p3.x + '" x2="' + p4.x + '" y1="' + p3.y + '" y2="' + p4.y + '" style="stroke:#000000;"/>';
};
