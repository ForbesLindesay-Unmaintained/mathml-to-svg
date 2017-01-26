'use strict';

var assert = require('assert');

class MOver {
  constructor(attribs, children) {
    this.attribs = attribs;
    assert(children.length === 2);
    this.top = children[0];
    this.bottom = children[1];
  }
  getFontLevel() {
    return Math.max(this.top.getFontLevel(), this.bottom.getFontLevel());
  }
  measure(fontSize) {
    this.topDimensions = this.top.measure(fontSize);
    this.bottomDimensions = this.bottom.measure(fontSize);
    return {
      width: Math.max(this.topDimensions.width, this.bottomDimensions.width),
      height: Math.max(this.topDimensions.height, this.bottomDimensions.height) * 2
    };
  }
  render(left, top, fontSize) {
    var dimensions = this.measure(fontSize);
    var middle = left + (dimensions.width / 2);
    var middleY = top + (dimensions.height / 2);
    return (
      this.top.render(middle - (this.topDimensions.width / 2), top, fontSize) +
      this.bottom.render(middle - (this.bottomDimensions.width / 2), middleY, fontSize)
    );
  }
}

module.exports = MOver;
