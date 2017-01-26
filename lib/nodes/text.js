'use strict';

const measureText = require('../measure-text.js');

class Text {
  constructor(data) {
    this.data = data;
  }
  getFontLevel() {
    return 0;
  }
  measure(fontSize) {
    return measureText(this.data, fontSize);
  }
  render(left, top, fontSize) {
    const dimensions = this.measure(fontSize);

    let rectangle = '<rect x="' + left + '" y="' + top +
      '" height="' + dimensions.height + '" width="' + dimensions.width + '"' +
      ' style="stroke:#006600; fill: none;"/>';

    // remove this line to see rectangles that show the bounding boxes of all characters
    rectangle = '';

    return '<text x="' + (left + 3) + '" y="' + (top + (dimensions.height / 1.5)) +
      '" fill="#000000" font-family="STIXGeneral-Italic" font-size="' + fontSize + '">' +
      this.data + '</text>';
  }
}

module.exports = Text;
