import * as Yup from 'yup';
import Establishment from '../models/Establishment';
import CreateNotification from '../../utils/CreateNotification';

class EstablishmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            phone: Yup.string().required(),
            city: Yup.string().required(),
            address: Yup.string().required(),
            number: Yup.string().required(),
            ZIP: Yup.string().required(),
            password: Yup.string().required(),
            work_start_time: Yup.string().required(),
            work_end_time: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const establishmentExists = await Establishment.findOne({
            email: req.body.email,
        });
        if (!establishmentExists) {
            const establishment = await Establishment.create(req.body);
            await CreateNotification(
                'cadastro feito com sucesso!',
                'Olá, Seja bem-vindo a xxx. Espero que tenha ótimas experiências e que tenha sucesso no seu caminho aqui',
                'https://media.discordapp.net/attachments/697512026251067472/719696299720704020/logo512.png',
                establishment._id
            );
            return res
                .status(200)
                .json({ email: establishment.email, id: establishment._id });
        }
        return res.status(400).json({ error: 'Email already used.' });
    }

    async show(req, res) {
        const establishment = await Establishment.findById(
            req.params.establishmentID
        ).populate('comments.author').populate('products').populate('orders');
        if (establishment) {
            return res.json(establishment);
        }
        return res.status(400).json({ error: 'Establishment not found' });
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
        const establishment = await Establishment.findById(
            req.params.establishmentID
        );
        if (!establishment) {
            return res
                .status(401)
                .json({ error: 'invalid or not provided token' });
        }
        const CheckEmail = await Establishment.findOne({
            email: req.body.email,
        });
        if (CheckEmail) {
            return res.status(400).json({ error: 'Email already used.' });
        }
        if (req.file) {
            const { location } = req.file;
            await establishment.updateOne({ thumbnail: location });
            await establishment.update(req.body);
            return res.json({ msg: 'ok! atualizado!' });
        }
        await establishment.update(req.body);
        return res.json({ msg: 'ok! atualizado!' });
    }

    async index(req, res) {
        const establishments = await Establishment.find({})
            // .populate('projects')
            // .populate('favorites');
            .populate('notifications');
        return res.json(establishments);
    }
}

export default new EstablishmentController();
