const fs = require('fs');
const Tesseract = require('tesseract.js');
const Convertor = require('../helpers/convertors');
const config = require('../config/config');

module.exports = {
	convertImage: async (req, res, next) => {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ msg: 'No file was uploaded.' });
		}

		const file = req.files.file;

		/* TODO: store file with unique name with timestamp or UUID */
		// const timestamp = Date.now();

		// Move file to storage
		file.mv(`${config.storage}/${file.name}`, (err) => {
			if (err) {
				res.status(500).json({ err });
			} else {
				/* Run tesseract OCR text extraction from the image. */
				Tesseract.recognize(`${config.storage}/${file.name}`, 'eng', {
					logger: (m) => console.log(m),
				}).then(({ data: { text } }) => {
					fs.writeFile(`${config.storage}/${file.name}.txt`, text, (err) => {
						if (err) {
							res.status(500).json({ msg: 'Failed to create .txt file' });
						}
					});

					Convertor.pdfConverter(text, file.name);
					res.status(200).json({ text, name: file.name });
				});
			}
		});
	},
};
