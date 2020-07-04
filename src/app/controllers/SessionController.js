import User from '../models/User';

class SessionController  {
    async store(req, res) {
        const {email} = req.body;
        await User.findOne({email}).then((response) => {
            if (response.password === req.body.password) {
                return res.json(response._id);
            }
            return res.status(401).json({msg: "wrong email or password"});
        }).catch((error) => {
            console.log(error);
            return res.status(401).json({msg: "wrong email or password"});
        });
    }
};

export default new SessionController();
