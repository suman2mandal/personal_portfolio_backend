import mongoose,{Schema} from 'mongoose';

const educationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    place: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    logo: {
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
    course: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    year: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    marks: {
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

export const Education = mongoose.model('Education', educationSchema,'Education');