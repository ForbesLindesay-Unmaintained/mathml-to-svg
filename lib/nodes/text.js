'use strict';

var measureText = require('../measure-text.js');

module.exports = Text;
function Text(data) {
  this.data = data;
}

Text.prototype.measure = function () {
  return measureText(this.data);
};

Text.prototype.render = function (left, top) {
  var dimensions = this.measure();
  return '<text x="' + left + '" y="' + (top + dimensions.height) +
    '" fill="#000000" font-family="Helvetica" font-size="10px">' +
    this.data + '</text>';
};