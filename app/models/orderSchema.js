import { object } from 'joi';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    customerId : {type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},

    items: {type: Object, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    paymentType: {type: String, default: 'COD'},
    status: {type: String, default: 'order_placed'}
}, {timestamps: true});

export default mongoose.model('order', orderSchema, 'orders');