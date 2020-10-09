const User = require('../models/user');

module.exports = {
	isAdmin: async (req, res, next) => {
		const user = req.params.user;
	},
};
