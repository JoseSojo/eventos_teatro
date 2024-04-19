import mongoose, { Schema } from 'mongoose';

const Files = new Schema({
    filename: String,
    description: String,
    use_id: String,
    size: Number,
    type: String,
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

export default mongoose.model('Files', Files);
