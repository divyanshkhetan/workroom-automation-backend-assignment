import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";


export default async function deleteUser(req, res) {
    try {
        console.log("Connecting to MongoDB...");
        await connectMongo();

        console.log("Deleting user...");
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            console.log("User not found");
            return res.status(200).json({
                success: false,
                message: "User not found",
            });
        }
        const userDeleted = await User.findOneAndRemove({ email: req.body.email });
        // console.log(userDeleted);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: userDeleted,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error,
        });
    }
}