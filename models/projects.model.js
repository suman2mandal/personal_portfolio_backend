import mongoose,{Schema} from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    link: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    image: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    technology: {
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
    }
})

export const Project = mongoose.model('Projects', projectSchema,'Projects');