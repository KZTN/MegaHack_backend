import Establishment from '../models/Establishment';

class CommentController {
  async store(req, res) {
    await Establishment.update(
      { _id: req.params.establishmentID },
      {
        $push: {
          comments: {
            author: req.body.author,
            comment: req.body.comment,
            rate: req.body.rate,
          },
        },
      }
    )
      .then(async () => {
        await Establishment.find({ _id: req.params.establishmentID })
          .populate("comments.author")
          .then((response) => {
            return res.json(response);
          })
          .catch((error) => {
            return res.json(error);
          });
      })
      .catch((error) => {
        return res.json(error);
      });
  }
};

export default new CommentController;
