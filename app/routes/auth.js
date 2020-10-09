const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

// Passport Strategies
const passportSignIn = passport.authenticate('local', { session: false });
// const passportJWT = passport.authenticate('jwt', { session: false });

router
	.route('/signup')
	.post(validateBody(schemas.signUpSchema), UsersController.signUp);

router
	.route('/signin')
	.post(
		validateBody(schemas.authSchema),
		passportSignIn,
		UsersController.signIn
	);

router.route('/confirmation/:token').post(UsersController.accountConfirmation);

module.exports = router;
