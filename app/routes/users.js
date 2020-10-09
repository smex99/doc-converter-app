const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const {
	validateBody,
	validateParam,
	schemas,
} = require('../helpers/routeHelpers');

const UsersController = require('../controllers/users');

// Passport Strategies
const passportJWT = passport.authenticate('jwt', { session: false });

router
	.route('/:userId')
	.get(
		validateParam(schemas.idSchema, 'userId'),
		passportJWT,
		UsersController.getUser
	)
	.put(
		validateParam(schemas.idSchema, 'userId'),
		passportJWT,
		UsersController.updateUser
	);

module.exports = router;
