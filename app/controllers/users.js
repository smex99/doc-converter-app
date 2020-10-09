const JWT = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');
// const nodemailer = require('nodemailer');

jwtSignUser = (user) => {
	return JWT.sign(
		{
			iss: 'shop-admin-app',
			sub: user._id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1),
		},
		config.authentication.jwtSecret
	);
};

module.exports = {
	// Authenticate user to api with locale strategy email/password.
	signUp: async (req, res, next) => {
		const { firstName, lastName, email, password } = req.value.body;
		const foundUser = await User.findOne({ email });

		if (foundUser) {
			return res.status(403).json({ error: 'This email already exists !' });
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
		});
		await newUser.save();
		const token = jwtSignUser(newUser);

		// token to send to user
		const confirmToken = JWT.sign(
			newUser.email,
			config.authentication.emailSecret
		);

		/* Email transport configuration */

		// let transporter = nodemailer.createTransport({
		// 	host: 'smtp.ethereal.email',
		// 	port: 587,
		// 	secure: false,
		// 	auth: {
		// 		user: testAccount.user,
		// 		pass: testAccount.pass,
		// 	},
		// });

		const url = `http://localhost:5000/api/auth/confirmation/${confirmToken}`;

		/* Send mail with defined transport object */

		// let info = await transporter.sendMail({
		// 	from: 'doc_converter.io', // sender address
		// 	to: newUser.email,
		// 	subject: 'Confirm Email Address',
		// 	html: `Please click this link to confirm your email: ${url}`,
		// });

		res.status(200).json({ token, newUser });
	},

	signIn: async (req, res, next) => {
		const email = req.value.body.email;
		const user = await User.findOne({ email });

		if (user.confirmed) {
			const token = jwtSignUser(req.user);
			res.status(200).json({ token, user });
		} else res.status(403).json({ message: 'Please confirm your email' });
	},

	signOut: async (req, res, next) => {
		res.json({ success: true });
	},

	// User resources
	Index: async (req, res, next) => {
		const users = await User.find({});
		res.status(200).json({ users });
	},

	getUser: async (req, res, next) => {
		const { userId } = req.params;
		const user = await User.findById(userId);
		res.status(200).json({ user });
	},

	updateUser: async (req, res, next) => {
		const { userId } = req.value.params;
		const newUser = req.body;
		const user = await User.findByIdAndUpdate(userId, newUser);
		res.status(200).json({ success: true });
	},

	deleteUser: async (req, res, next) => {
		res.status(200).json({ success: true });
	},

	accountConfirmation: async (req, res, next) => {
		const token = req.params;
		// verify the token info
		const usertoken = JWT.verify(token, config.authentication.emailSecret);
		// update the user
		const user = await User.findByIdAndUpdate();
		res.status(200).json({ success: true });
	},
};
