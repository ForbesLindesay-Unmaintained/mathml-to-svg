'use strict';

const assert = require('assert');
const getNextFontSize = require('../next-font-size');

class MSup {
  constructor(attribs, children) {
    this.attribs = attribs;
    assert(children.length === 2);
    this.value = children[0];
    this.exponent = children[1];
  }
  getFontLevel() {
    const exponentLevel = this.exponent.getFontLevel();
    const valueLevel = this.exponent.getFontLevel();
    return Math.max(valueLevel, exponentLevel + 1);
  }
  measure(fontSize) {
    this.valueDimensions = this.value.measure(fontSize);
    this.exponentDimensions = this.exponent.measure(getNextFontSize(fontSize));
    return {
      width: this.valueDimensions.width + this.exponentDimensions.width,
      height: (this.valueDimensions.height / 2) + this.exponentDimensions.height
    };
  }
  render(left, top, fontSize) {
    var dimensions = this.measure(fontSize);
    return (
      this.value.render(left, top + this.exponentDimensions.height - (this.valueDimensions.height / 2), fontSize) +
      this.exponent.render(left + this.valueDimensions.width, top, getNextFontSize(fontSize))
    );
  }
}

module.exports = MSup;
