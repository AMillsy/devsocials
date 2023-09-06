const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    reqiured: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

/**
 * post
 * Title : String -- Title of the post the user is making
 * Description : String -- Description of the post the user is making
 * image : String -- Will be a url that links to the image saved in AWS
 *
 */

const Post = model("Post", postSchema);
module.exports = Post;
