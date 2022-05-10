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
    postedBy: {
      type: schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    ratting: {
      one: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
      two: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
      three: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
      four: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
      five: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: [
      {
        sender: {
          type: schema.Types.ObjectId,
          ref: "User",
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
