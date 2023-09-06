const { Schema } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = commentSchema;
