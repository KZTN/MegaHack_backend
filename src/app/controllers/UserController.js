import * as Yup from 'yup';
import User from '../models/User';
import CreateNotification from '../../utils/CreateNotification';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            city: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            const user = await User.create(req.body);
            await CreateNotification(
                'cadastro feito com sucesso!',
                'Olá, Seja bem-vindo a xxx. Espero que tenha ótimas experiências e que tenha sucesso no seu caminho aqui',
                'https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png',
                user._id
            );

            return res.status(200).json({ email: user.email, id: user._id });
        }
        return res.status(400).json({ error: 'Email already used.' });
    }

    async show(req, res) {
        const user = await User.findById(req.params.userID).populate("orders").populate({
            path: 'orders',
            populate: {
              path: 'product',
              populate: {
                path: 'orders.product'
              }
            }
          }).populate({
            path: 'orders',
            populate: {
              path: 'establishment',
              populate: {
                path: 'orders.establishment'
              }
            }
          }).populate("notifications").populate("favorites");
        if (user) {
            return res.json(user);
        }
            return res.status(400).json({error: 'user not found'});

    }

    async update(req, res) {
        const schema = Yup.object().shape({
            phone: Yup.string().min(11).notRequired(),
            name: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            city: Yup.string().notRequired(),
            uf: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            ZIP: Yup.string().notRequired(),
            email: Yup.string().email().notRequired(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails.' });
        }
        const user = await User.findById(req.params.userID);
        if (!user) {
            return res
                .status(401)
                .json({ error: 'invalid or not provided token' });
        }
        const CheckEmail = await User.findOne({ email: req.body.email });
        if (CheckEmail) {
            return res.status(400).json({ error: 'Email already used.' });
        }
        if (req.file) {
            const { location } = req.file;
            await user.updateOne({ thumbnail: location });
            await user.update(req.body);
            return res.json({ msg: 'ok! atualizado!' });
        }
        await user.update(req.body);
        return res.json({ msg: 'ok! atualizado!' });
    }

    async index(req, res) {
        const users = await User.find({});
        return res.json(users);
    }
}

export default new UserController();
