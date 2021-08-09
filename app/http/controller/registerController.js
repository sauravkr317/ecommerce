import Joi from "joi";
import { User } from "../../models";
import bcrypt from 'bcrypt';
import { CustomerrorHandler } from "../../services";

function registerController() {
    return {
        index(req, res, next) {
            res.render('auth/register');
        },
        async register(req, res, next) {
            const registerSchema = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().max(13).min(10).required(),
                password: Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'))
            });

            const { error } = registerSchema.validate(req.body);

            const { name, email, phone, password } = req.body;
            if (!name || !email || !phone || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                req.flash('phone', phone);
                return res.redirect('/register');
            }
            if (error) {
                next(error);
                req.flash('error', req.Data.message);
                req.flash('name', name);
                req.flash('email', email);
                req.flash('phone', phone);
                return res.status(req.status).redirect('/register');
            }

            // check user in database
            try {
                const exist = await User.exists({ email: email });
                if (exist) {
                    next(CustomerrorHandler.AlreadyExists());
                    req.flash('error', req.Data.message);
                    req.flash('name', name);
                    req.flash('email', email);
                    req.flash('phone', phone);
                    return res.status(req.status).redirect('/register');
                }
            } catch (error) {
                res.status(500).send('Server error');
            }

            const hashpassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                phone,
                password: hashpassword
            });
            try {
                const save = await user.save();
            } catch (error) {
                res.status(500).send('Server error');
            }
            res.redirect('/login');
        }

    }
}

export default registerController;
