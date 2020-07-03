const Notification = require('../models/Notification');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    await Notification.create(req.body)
      .then(() => res.json({ msg: 'ok!' }))
      .catch((error) => res.status(400).json(error));
  },
  async index(req, res) {
    await Notification.find({})
      .then((response) => res.json(response))
      .catch((error) => res.status(400).json(error));
  },
  async update(req, res) {
    await Notification.update({ _id: req.params.id }, { state: 'read' })
      .then(() => res.json({ msg: 'ok' }))
      .catch((error) => res.status(400).json(error));
  },
  async delete(req, res) {
    await User.findById({ _id: req.params.user_id }).then(async (response) => {
      const newlist = await response.notifications.filter(
        (value) => value !== req.params.notification_id,
      );
      response.update({ notifications: newlist }).then(() => res.json({ msg: 'ok' }).catch((error) => {
        console.log(error);
      }));
    });
  },
};
