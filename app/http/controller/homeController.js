import { Products, User } from "../../models";

function homeController() {
    return {
        async index(req, res, next) {
            let product
            let user
            try {
                product = await Products.find().select('-__v');
                if (!product) {
                    res.status(404).render('home', { error: 'No products found!' });
                }
            } catch (error) {
                return next(error);
            }

            if (req.user) {
                try {
                    user = await User.findOne({ _id: req.user._id });
                } catch (error) {
                    return res.send('something went wrong');
                }
                return res.render('home', { products: product, user: user });

            }

            res.render('home', { products: product });
        }
    }
}

export default homeController;