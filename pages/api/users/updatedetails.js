import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";

const passwordHandler = require("../../../utils/passwordHandler");

export default async function updateUser(req, res) {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongo();

    console.log("Updating user...");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    
    if (await passwordHandler.comparePassword(req.body.oldPassword, user.password)) {
      console.log("Password does not match");
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
    const userUpdated = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          profession: req.body.profession,
        },
      }
    );
    // console.log(userUpdated);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error,
    });
  }
}
