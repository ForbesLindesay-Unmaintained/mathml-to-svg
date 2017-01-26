'use strict';

var assert = require('assert');

module.exports = msup;
function msup(attribs, children) {
  this.attribs = attribs;
  assert(children.length === 2);
  this.value = children[0];
  this.exponent = children[1];
}

msup.prototype.measure = function () {
  this.valueDimensions = this.value.measure();
  this.exponentDimensions = this.exponent.measure();
  return {
    width: this.valueDimensions.width + this.exponentDimensions.width,
    height: (this.valueDimensions.height / 2) + this.exponentDimensions.height
  };
};

msup.prototype.render = function (left, top) {
  var dimensions = this.measure();
  return (
    this.value.render(left, top + this.exponentDimensions.height - (this.valueDimensions.height / 2)) +
    this.exponent.render(left + this.valueDimensions.width, top)
  );
};
