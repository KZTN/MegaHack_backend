import * as Yup from 'yup';
import Order from '../models/Order';
import Establishment from '../models/Establishment';
import User from '../models/User';

class OrderController {
        async store(req, res) {
/*             const schema = Yup.object().shape({
                establishment: Yup.string().required(),
                user: Yup.string().email().required(),
                product: Yup.string().required(),
            });
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'validation fails.' });
            } */
            const order = await Order.create(req.body);
            await Establishment.updateOne(
                { _id: req.body.establishment },
                {
                    $push: {
                        orders: order._id,
                    },
                }
            );
            await User.updateOne(
                { _id: req.body.user },
                {
                    $push: {
                        orders: order._id,
                    },
                }
            );
            return res.json(order);
    }

    async index(req, res) {
        const orders = await Order.find({});
        return res.json(orders);
    }
};

export default new OrderController();

