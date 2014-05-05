'use strict';

module.exports = mrow;
function mrow(attribs, children) {
  this.attribs = attribs;
  this.children = children;
}

mrow.prototype.measure = function () {
  return this.children.map(function (child) {
    return child.measure();
  }).reduce(function (accumulator, child) {
    return {
      width: accumulator.width + child.width,
      height: Math.max(accumulator.height, child.height)
    };
  }, {width: 0, height: 0});
};

mrow.prototype.render = function (left, top) {
  var dimensions = this.measure();
  var middle = top + (dimensions.height / 2);
  return '<!--mrow-->' + this.children.map(function (child) {
    var childDimensions = child.measure();
    var childLeft = left;
    left += childDimensions.width;
    return child.render(childLeft, middle - (childDimensions.height / 2));
  }).join('\n') + '<!--/mrow-->';
};