const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';
import { User } from '../models';

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // login
        // check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user with this email' });
        }
        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return done(null, user, { message: 'Logged in succesfully' });
            }
            return done(null, false, { message: 'Email or password is incorrect' });

        } catch (error) {
            return done(null, false, { message: 'Something went wrong' });
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        await User.findById(_id, (err, user) => {
            done(err, user);
        })
    })
}

export default init;