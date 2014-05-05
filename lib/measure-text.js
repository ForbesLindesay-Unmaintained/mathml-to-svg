'use strict';

var PDFDocument = require('pdfkit');

module.exports = measure;
function measure(text, options) {
  options = options || {};
  var doc = new PDFDocument();

  return {
    width: doc.widthOfString(text),
    height: doc.heightOfString(text)
  };
}