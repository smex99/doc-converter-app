const config = require('../config/config');

module.exports = {
	// TODO: PDF attachment download does not work correctly.
	getAttachement: async (req, res, next) => {
		const { name, type } = req.query;
		res.download(`${config.storage}/${name}.${type}`);
	},
};
