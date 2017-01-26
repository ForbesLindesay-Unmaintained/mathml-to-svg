'use strict';

var assert = require('assert');

class MFrac {
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
      height: Math.max(this.topDimensions.height, this.bottomDimensions.height) * 2 + (fontSize / 2)
    };
  }
  render(left, top, fontSize) {
    var dimensions = this.measure(fontSize);
    var middle = left + (dimensions.width / 2);
    var middleY = top + (dimensions.height / 2);
    return (
      this.top.render(middle - (this.topDimensions.width / 2), top, fontSize) +
      '<line x1="' + left + '" x2="' + (left + dimensions.width) +
      '" y1="' + middleY + '" y2="' + middleY + '" style="stroke:#000000;"/>' +
      this.bottom.render(middle - (this.bottomDimensions.width / 2), top + middleY + (fontSize / 4), fontSize)
    );
  }
}

module.exports = MFrac;
