'use strict';

const assert = require('assert');

class MSqrt {
  constructor(attribs, children) {
    this.attribs = attribs;
    assert(children.length === 1);
    this.body = children[0];
  }
  getFontLevel() {
    return this.body.getFontLevel();
  }
  measure(fontSize) {
    const bodyDimensions = this.body.measure(fontSize);
    return {
      width: bodyDimensions.width + fontSize,
      height: Math.max(bodyDimensions.height + (fontSize / 2), 1.5 * fontSize)
    };
  }
  render(left, top, fontSize) {
    var dimensions = this.measure(fontSize);
    var bottom = top + dimensions.height;
    var right = left + dimensions.width;
    var p1 = {x: left, y: bottom - fontSize};
    var p2 = {x: left + 10, y: bottom - fontSize / 4};
    var p3 = {x: left + 20, y: top + fontSize / 4};
    var p4 = {x: right, y: top + fontSize / 4};
    return this.body.render(
      left + fontSize,
      top + fontSize / 4,
      fontSize
    ) +
    '<line x1="' + p1.x + '" x2="' + p2.x + '" y1="' + p1.y + '" y2="' + p2.y + '" style="stroke:#000000;"/>' +
    '<line x1="' + p2.x + '" x2="' + p3.x + '" y1="' + p2.y + '" y2="' + p3.y + '" style="stroke:#000000;"/>' +
    '<line x1="' + p3.x + '" x2="' + p4.x + '" y1="' + p3.y + '" y2="' + p4.y + '" style="stroke:#000000;"/>';
  }
}
module.exports = MSqrt;
