const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    message: {
      type: String,
      required: [true, "Please enter a message"],
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    wasResponded: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
