import { Order } from "../../../models";
import moment from "moment";

function orderController() {
    return {
        async index(req, res, next) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } });
            res.render('orders/customerOrder', { orders: orders, moment: moment });
        }
    }
}

export default orderController;