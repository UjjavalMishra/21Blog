const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require:true,
    },
    coverImageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
}, {timestamps:true});

const Blog = model('blogs', blogSchema);
module.exports = {Blog};