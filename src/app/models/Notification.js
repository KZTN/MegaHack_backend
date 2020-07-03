import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    state: { type: String, default: 'unread' },
    recipient:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Notification', NotificationSchema);
