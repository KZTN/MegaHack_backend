import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    establishment:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
      },
      thumbnail: String,
      hashtags: [String],
      title: String,
      description: String,
      price: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
