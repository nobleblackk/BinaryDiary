const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  //   We will print User Name and Avatar along side to post, we can simply do that by simply populating the "user" property in Post-Model, but here we are separately initializing those fields =>
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },

  //   Likes will be an array of objects, which will contain the IDs of all people who have liked the post
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],

  //   Comments will also be an array of objects just like the "likes", but we also want some other information along side the comments, i.e. => person name, avatar, date.
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },

      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
