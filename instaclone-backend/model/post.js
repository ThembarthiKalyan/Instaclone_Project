const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
    title: {type: String, require: true},
    location:{type: String},
    body: {type: String},
    image: {type: String, require: true},
    date: String,
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    likes: {type: Number, default: 0}
});

const Post=mongoose.model('Post', PostSchema);
module.exports=Post;