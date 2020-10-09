const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

userSchema.pre('save', async function (next) {
	try {
		// Generate salt
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

const User = mongoose.model('user', userSchema);
module.exports = User;
