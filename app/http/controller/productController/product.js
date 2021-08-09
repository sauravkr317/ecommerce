import multer from 'multer';
import path from 'path';
import fs from 'fs';
import productValidate from './validation';
import { Products } from '../../../models';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'Uploads/'),
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniquename);
    }
});

const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image');

const productsController = {
    store(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(err);
            }

            const path = req.file.path;

            const { error } = productValidate.validate(req.body);

            if (error) {
                fs.unlink(`${rootDir}/${path}`, (err) => {
                    if (err) {
                        return next(err);
                    }
                })

                return next(error);
            }

            const { name, price, image } = req.body;
            let document;
            try {
                document = await Products.create({
                    name,
                    price,
                    image: path
                });
            } catch (error) {
                return next(error);
            }

            res.status(201).json(document);
        })
    }
}

export default productsController;