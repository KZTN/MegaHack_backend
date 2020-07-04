import * as Yup from 'yup';
import Order from '../models/Order';
import Establishment from '../models/Establishment';
import User from '../models/User';
import CreateNotification from '../../utils/CreateNotification';

class OrderController {
        async store(req, res) {
            const schema = Yup.object().shape({
                establishment: Yup.string().required(),
                user: Yup.string().required(),
                product: Yup.string().required(),
            });
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'validation fails.' });
            }
            const order = await Order.create(req.body);
            const orderResult = await Order.findById(order._id).populate('user').populate('establishment').populate('product');
            await CreateNotification(
                'Pedido feito com sucesso!',
                `Olá, ${orderResult.user.name}. O pedido ${orderResult.product.name} no valor de ${orderResult.product.price} foi feito com sucesso`,
                `${orderResult.product.thumbnail}`,
                req.body.user
            );
            await Establishment.updateOne(
                { _id: req.body.establishment },
                {
                    $push: {
                        orders: order,
                    },
                }
            );
            await User.updateOne(
                { _id: req.body.user },
                {
                    $push: {
                        orders: order,
                    },
                }
            );
            return res.json(order);
    }

    async index(req, res) {
        const orders = await Order.find({});
        return res.json(orders);
    }

    async show(req, res) {
        const order = await Order.findById(req.params.orderID).populate('user').populate('establishment').populate('product');
        if (order) {
            return res.json(order);
        }
            return res.status(400).json({error: 'order not found'});
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails.' });
        }
        const order = await Order.update({_id: req.params.orderID}, {state: req.body.state});
        if (!order) {
            return res.status(400).json({ error: 'order not found' });
        }
        return res.json({msg: "Order updated with success"});
    }
};

export default new OrderController();

