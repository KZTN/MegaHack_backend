import Notification from '../app/models/Notification';
import User from '../app/models/User';

export default async function createNotification(title, description, thumbnail, userID) {
  await Notification.create({
    title,
    description,
    thumbnail,
    recipient: userID,
  }).then(async (response) => {
    await User.update(
      { _id: userID },
      { $push: { notifications: response._id } },
      { new: true },
    );
  }).catch((error) => {
    console.log(error);
  });
}
