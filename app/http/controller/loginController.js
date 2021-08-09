import { User } from '../../models';
import bcrypt from 'bcrypt';
import passport from 'passport';

function loginController() {
    return {
        index(req, res, next) {
            res.render('auth/login');
        },

        async login(req, res, next) {
            const { email, password } = req.body;
            if (!email || !password) {
                req.flash('error', 'All fields are required');
                return res.status(req.status).redirect('/login');
            }

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }

                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }

                    return res.redirect('/');
                })

            })(req, res, next)

        },

        async logout(req, res, next) {
            req.logout()
            return res.redirect('/login');
        }
    }
}

export default loginController;
