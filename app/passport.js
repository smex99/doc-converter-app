const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const config = require('./config/config');

// JSON WEB TOKENS STRATEGY
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.authentication.jwtSecret,
		},
		async (payload, done) => {
			try {
				const user = await User.findById(payload.sub);

				if (!user) {
					return done(null, false);
				}

				done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

// LOCAL STRATEGY
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email: email });

				if (!user) {
					return done(null, false);
				}

				const isMatch = await user.isValidPassword(password);

				if (!isMatch) {
					return done(null, false);
				}

				done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

// GOOGLE STRATEGY
