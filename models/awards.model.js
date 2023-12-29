import mongoose from 'mongoose';
const awardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
})
export const Award = mongoose.model('Awards', awardSchema,'Awards');