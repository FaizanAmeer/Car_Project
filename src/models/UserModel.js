import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter firstName"],
    },
    lastName: {
      type: String,
      required: [true, "please enter lastName"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please add phone number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
