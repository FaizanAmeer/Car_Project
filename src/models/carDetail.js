const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: [true, "Car model is required"],
    minlength: [3, "Car model must be at least 3 characters long"],
  },
  price: { type: Number, required: [true, "Price is required"] },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  maxPictures: {
    type: Number,
    required: [true, "Max number of pictures is required"],
    min: [1, "Min value is 1"],
    max: [10, "Max value is 10"],
  },
  pictures: {
    type: [String],
    default: [],
    min: [1, "Min value is 1"],
    max: [10, "Max value is 10"],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const carDetailModel =
  mongoose.models.carSchema || mongoose.model("carSchema", carSchema);

export default carDetailModel;
