import * as Yup from 'yup';
import Post from '../models/Post';

class PostController {
    async store(req, res) {
        const schema = Yup.object().shape({
            establishment: Yup.string().required(),
            title: Yup.string().required(),
            hashtags: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.string().required()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        req.body.hashtags = req.body.hashtags.split(', ');
        await Post.create(req.body).then(async (response) => {
            if (req.file) {
                const { location } = req.file;
                await response.updateOne({ thumbnail: location });
                return res.json(response);
            }
            return res.json(response);
        }).catch((error) => {
            return res.json(error);
        })
    }

    async show(req, res) {
     const post = await Post.findById(req.params.postID).populate('establishment');
     if (!post) {
         return res.status(400).json({error: "post not found"});
        }
        return res.json(post);
    }

    async index(req, res) {
        await Post.find({}).populate('establishment').then((response) => {
            return res.json(response);
        }).catch((error) => {
            return res.json(error);
        })
    }
}

export default new PostController();
