import Notification from '../models/Notification';
import User from '../models/User';

class NotificationController {
  async store(req, res) {
    await Notification.create(req.body)
      .then(() => res.json({ msg: 'ok!' }))
      .catch((error) => res.status(400).json(error));
  }

  async index(req, res) {
    const notifications = await Notification.find({});
    return res.json(notifications);
}

async show(req, res) {
    const notification = await Notification.findById(req.params.notificationID).populate('recipient');
    return res.json(notification);
}

  async update(req, res) {
    await Notification.update({ _id: req.params.id }, { state: 'read' })
      .then(() => res.json({ msg: 'ok' }))
      .catch((error) => res.status(400).json(error));
  }

  async delete(req, res) {
    await User.findById({ _id: req.params.user_id }).then(async (response) => {
      const newlist = await response.notifications.filter(
        (value) => value !== req.params.notification_id,
      );
      response.update({ notifications: newlist }).then(() => res.json({ msg: 'ok' }).catch((error) => {
        console.log(error);
      }));
    });
  }
};

export default new NotificationController();
