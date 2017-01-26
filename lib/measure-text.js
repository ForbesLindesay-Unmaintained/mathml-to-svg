'use strict';

var PDFDocument = require('pdfkit');
var ent = require('ent');

module.exports = measure;
function measure(text, fontSize = 25) {
  var doc = new PDFDocument();
  doc.font(__dirname + '/../STIXv1.1.1-webfonts/stix-web/STIXGeneral-Italic.ttf')
     .fontSize(fontSize);
  text = ent.decode(text);
  return {
    width: doc.widthOfString(text) + 6,
    height: doc.heightOfString(text)
  };
}
