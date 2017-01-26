'use strict';

'use strict';

const assert = require('assert');

class MRow {
  constructor(attribs, children) {
    this.attribs = attribs;
    this.children = children;
  }
  getFontLevel() {
    return this.children.map(
      child => child.getFontLevel()
    ).reduce(
      (accumulator, child) => Math.max(accumulator, child),
      0
    );
  }
  measure(fontSize) {
    return this.children.map(
      child => child.measure(fontSize)
    ).reduce(
      (accumulator, child) => ({
        width: accumulator.width + child.width,
        height: Math.max(accumulator.height, child.height)
      }),
      {width: 0, height: 0}
    );
  }
  render(left, top, fontSize) {
    const dimensions = this.measure(fontSize);
    const middle = top + (dimensions.height / 2);
    return this.children.map(child => {
      const childDimensions = child.measure(fontSize);
      const childLeft = left;
      left += childDimensions.width;
      return child.render(childLeft, middle - (childDimensions.height / 2), fontSize);
    }).join('\n');
  }
}

module.exports = MRow;
