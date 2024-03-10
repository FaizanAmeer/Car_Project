import Auth from "dd(@/Utility/auth)";
import connectDB from "dd(@/config/db)";
import User from "dd(@/models/UserModel)";
import UserModel from "dd(@/models/UserModel)";
import { NextRequest } from "next/server";

export async function POST(request) {
  try {
    connectDB();
    const data = await request.json();
    const user = await User.findOne({ email: data.email });
    if (
      !user ||
      !(await Auth.verifyHashPassword({
        data: data.password,
        hash: user.password,
      }))
    ) {
      throw new Error("Please enter your valid credentials!");
    }
    const token = await Auth.generateToken(user._id);
    const addToken = await User.findByIdAndUpdate(
      { _id: user._id },
      { accessToken: token },
      { new: true }
    ).select("-password");

    return Response.json({ user: addToken, success: true });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
}
