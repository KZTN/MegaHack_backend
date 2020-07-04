import User from '../models/User';

class FavoriteController {
    async store(req, res) {
        await User.updateOne(
            { _id: req.params.userID },
            {
                $push: {
                    favorites: req.body.product,
                },
            }
        )
            .then(() => {
                return res.json({ msg: 'ok!' });
            })
            .catch((error) => {
                return res.json(error);
            });
    }
}

export default new FavoriteController();
