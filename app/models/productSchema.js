import mongoose from 'mongoose';
import { DOMAIN_URL } from '../config';
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, require: true },
    image: { type: String, require: true, get: (image) => `${DOMAIN_URL}/${image}` }
}, { timestamps: true, toJSON: { getters: true } });

export default mongoose.model('product', productSchema, 'products');