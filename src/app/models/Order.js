import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    state: { type: String, default: 'pending' },
    establishment:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
      },
    user:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    product:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
