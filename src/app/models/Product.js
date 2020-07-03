import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    thumbnail: String,
    ingredients: [String],
    establishment:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
      },
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

ProductSchema.virtual('thumbnail_url').get(function () {
  return `${process.env.APP_URL}/uploads/products/${this.thumbnail}`;
});

export default mongoose.model('Product', ProductSchema);
