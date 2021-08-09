import joi from 'joi';

const productValidate = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string()
});

export default productValidate;