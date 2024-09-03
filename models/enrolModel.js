const mongoose = require("mongoose");

const enrolSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter a last name"],
    },
    address: {
      type: String,
      required: [true, "Please enter an address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    birthday: {
      type: Date,
      required: [true, "Please enter a birthday"],
    },
    canSwim: {
      type: Boolean,
      required: [true, "Please specify if the enrollee can swim"],
    },
    isVegetarian: {
      type: Boolean,
      required: [true, "Please specify if the enrollee is vegetarian"],
    },
    isVacc: {
      type: Boolean,
      required: [true, "Please specify if the enrollee is vaccinated"],
    },
    canBivouac: {
      type: Boolean,
      required: [true, "Please specify if the enrollee can bivouac"],
    },
    canPhoto: {
      type: Boolean,
      required: [true, "Please specify if the enrollee can be photographed"],
    },
    wantsTshirt: {
      type: Boolean,
      required: [true, "Please specify if the enrollee wants a T-shirt"],
    },
    tshirtSize: {
      type: String,
      required: false,
    },
    additionalInfo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Enrolments",
  }
);

const Enrol = mongoose.model("Enrol", enrolSchema);

module.exports = Enrol;
