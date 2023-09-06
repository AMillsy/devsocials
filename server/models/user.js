const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /.[\w_\.-]+@[\w\.-]+\.(\w{2,3})+/,
        "Must match an email address!",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { toJSON: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("postCount").get(function () {
  return this.posts.length;
});
const User = model("User", userSchema);

module.exports = User;

/**
 * username -- string: needed as its a social media app, we need to store some identification
 * email -- string: So that they can login either via username or email
 * password -- string: To secure the account, using bcrypt to hash the passwords
 * posts -- Mongoose IDs: Links to all the posts that the user will have
 *
 */
