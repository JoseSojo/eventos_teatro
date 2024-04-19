import mongoose, { Schema, Types } from 'mongoose';

const User = new Schema({
    email: String,
    username: String,
    password: String,
    token: String,
    access_token: String,
    rol: String,
    session_status: Boolean,
    photo_id: {
        type: Types.ObjectId,
        ref: 'Files'
    },
    photo: {
        type:String,
        default:'profile.png'
    },
    create_at: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    update_at: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    delete_at: Schema.Types.Date,
});

export default mongoose.model('User', User);
