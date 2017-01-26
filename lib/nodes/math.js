'use strict';

class MathML {
  constructor(attribs, children) {
    this.attribs = attribs;
    this.children = children;
  }
  getFontLevel() {
    return this.children.map(
      child => child.getFontLevel()
    ).reduce(
      (level, childLevel) => Math.max(level, childLevel),
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
    var dimensions = this.measure(fontSize);
    var middle = top + (dimensions.height / 2);
    var fonts = '<style>' +
      '@font-face {' +
      'font-family: "STIXGeneral-Italic";' +
      'src: url("../../STIXv1.1.1-webfonts/stix-web/STIXGeneral-Italic.woff");' +
      '}' +
      '</style>';
    return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' +
        'width="' + dimensions.width + '" height="' + dimensions.height + '">' +
        fonts +
        this.children.map(function (child) {
          var childDimensions = child.measure(fontSize);
          var childLeft = left;
          return child.render(childLeft, middle - (childDimensions.height / 2), fontSize);
        }).join('\n') + '</svg>';
  }
}

module.exports = MathML;
