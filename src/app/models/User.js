import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        thumbnail: String,
        street: String,
        number: String,
        city: String,
        ZIP: String,
        subscribed: { type: Boolean, default: false },
        favorites: [
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
    }
);

UserSchema.virtual('thumbnail_url').get(function () {
    return `${
        process.env.APP_URL
    }/uploads/users/${this.email.split('.').join('')}/${this.thumbnail}`;
});

export default mongoose.model('User', UserSchema);
