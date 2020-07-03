import mongoose from 'mongoose';

const EstablishmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    thumbnail: String,
    password: String,
    street: String,
    number: String,
    city: String,
    ZIP: String,
    work_start_time: String,
    work_end_time: String,
    subscribed: { type: Boolean, default: false },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            comment: String,
            rate: Number,
        },
    ],
    orders: [
        {
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        },
    ],
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

EstablishmentSchema.virtual('thumbnail_url').get(function () {
  return `${process.env.APP_URL}/uploads/estabilishments/${this.email.split('.').join('')}/${this.thumbnail}`;
});

export default mongoose.model('Establishment', EstablishmentSchema);
