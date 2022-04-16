const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Post = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    post_type: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    subCatagory: {
      type: String,
      required: true,
    },
    ratting: {
      one: {
        type: [],
        default: 0,
      },
      two: {
        type: [],
        default: 0,
      },
      three: {
        type: [],
        default: 0,
      },
      four: {
        type: [],
        default: 0,
      },
      five: {
        type: [],
        default: 0,
      },
    },
    comments: [
      {
        sender: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
