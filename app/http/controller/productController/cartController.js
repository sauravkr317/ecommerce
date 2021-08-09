import { session } from "passport";
import { Order } from "../../../models";

function cartController() {
    return {
        index(req, res, next) {
            res.render('cart/cart');
        },

        order(req, res, next) {
            res.render('cart/order');
        },

        async postorder(req, res, next) {
            const { phone, landmark, address } = req.body;
            if (!phone || !landmark || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/place-order');
            }

            if (Object.keys(req.session.cart.items).length === 0) {
                req.flash('error', 'your cart is empty');
                return res.redirect('/place-order');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                landmark,
                address
            })

            try {
                const save = await order.save();
                req.flash('success', 'order placed successfully');
                delete req.session.cart;
                return res.redirect('/customer/orders');
            } catch (error) {
                req.flash('error', 'something went wrong');
                return res.redirect('/place-order');
            }
        },

        update(req, res, next) {
            // let cart = {
            //     items: {
            //         phoneId: { item: phoneObject, qty: 0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart;
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                },
                    cart.totalQty = cart.totalQty + 1,
                    cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty });
        },
        deleteCart(req, res, next) {
            // let cart = {
            //     items: {
            //         phoneId: { item: phoneObject, qty: 0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            let cart = req.session.cart;
            if (cart.items[req.body.item._id]) {
                delete cart.items[req.body.item._id]
                cart.totalQty = cart.totalQty - req.body.qty,
                    cart.totalPrice = cart.totalPrice - (req.body.qty * req.body.item.price);
            }
            return res.json({ redirect: 'http://localhost:3000/cart' });
        }
    }
}

export default cartController;