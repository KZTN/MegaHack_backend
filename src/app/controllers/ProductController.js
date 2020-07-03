import * as Yup from 'yup';
import Establishment from '../models/Establishment';
import Product from '../models/Product';

import CreateNotification from '../../utils/CreateNotification';

class ProductController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            ingredients: Yup.string().required(),
            price: Yup.number().required(),
            establishment: Yup.string().required(),
            type: Yup.string().required(),
            weight: Yup.string().notRequired(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails.' });
        }
        req.body.ingredients = req.body.ingredients.split(', ');

        const product = await Product.create(req.body);
        if (req.file) {
            const { location } = req.file;
            await product.updateOne({ thumbnail: location });
            await product.update(req.body);
        }
        await Establishment.updateOne(
            { _id: req.body.establishment },
            {
                $push: {
                    products: product._id,
                },
            }
        );
        return res.json(product);
    }

    async index(req, res) {
        const products = await Product.find({});
        return res.json(products);
    }
}

export default new ProductController();
