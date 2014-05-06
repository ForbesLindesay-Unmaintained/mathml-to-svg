'use strict';

var measureText = require('../measure-text.js');

module.exports = Text;
function Text(data) {
  this.data = data;
}

Text.prototype.measure = function () {
  var dimensions = measureText(this.data);
  return dimensions;
};

Text.prototype.render = function (left, top) {
  var dimensions = this.measure();
  
  var rectangle = '<rect x="' + left + '" y="' + top +
    '" height="' + dimensions.height + '" width="' + dimensions.width + '"' +
    ' style="stroke:#006600; fill: none;"/>';
  
  // remove this line to see rectangles that show the bounding boxes of all characters
  rectangle = '';
  
  return '<text x="' + (left + 3) + '" y="' + (top + (dimensions.height / 1.5)) +
    '" fill="#000000" font-family="STIXGeneral-Italic" font-size="25">' +
    this.data + '</text>';
};