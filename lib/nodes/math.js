'use strict';

module.exports = MathML;
function MathML(attribs, children) {
  this.attribs = attribs;
  this.children = children;
}

MathML.prototype.measure = function () {
  return this.children.map(function (child) {
    return child.measure();
  }).reduce(function (accumulator, child) {
    return {
      width: accumulator.width + child.width,
      height: Math.max(accumulator.height, child.height)
    };
  }, {width: 0, height: 0});
};

MathML.prototype.render = function (left, top) {
  var dimensions = this.measure();
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
        var childDimensions = child.measure();
        var childLeft = left;
        return child.render(childLeft, middle - (childDimensions.height / 2));
      }).join('\n') + '</svg>';
};