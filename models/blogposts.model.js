import mongoose,{Schema} from 'mongoose';

const blogpostsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    dataURL: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    bannerImage:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    inPostLinks:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    otherPostLink:{
        type: String,
        trim: true,
        minlength: 3
    },
    link:{
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
},{
    timestamps: true,
});

export const Blogposts = mongoose.model('Blogposts', blogpostsSchema,'Blogposts');