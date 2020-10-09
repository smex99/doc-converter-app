const fs = require('fs');
const PDFDocument = require('pdfkit');
const config = require('../config/config');

module.exports = {
	pdfConverter: (text, name) => {
		const doc = new PDFDocument();
		doc.pipe(fs.createWriteStream(`${config.storage}/${name}.pdf`));
		doc.fontSize(10).text(text);
		doc.end();

		return doc;
	},

	textConverter: (text, name) => {
		fs.writeFile(`${config.storage}/${name}.txt`, text, (err) => {
			if (err) {
				return err;
			}
		});
	},
};
