import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";

const passwordHandler = require("../../../utils/passwordHandler");

export default async function createUser(req, res) {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongo();

    console.log("Creating user...");

    const hashedPassword = await passwordHandler.encryptPassword(req.body.password);

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      profession: req.body.profession,
      email: req.body.email,
      password: hashedPassword,
    };

    if(!data.password){
      return res.status(400).json({
        success: false,
        message: "Password Encryption Failed!"
      });
    }

    const newUserModel = new User(data);

    const newUser = await newUserModel.save();

    // console.log(newUser);

    console.log("User Created...");

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    console.log(error);
    if(error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error,
    });
  }
}
