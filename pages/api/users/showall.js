import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";


export default async function showAllUser(req, res) {
    try {
        console.log("Connecting to MongoDB...");
        await connectMongo();

        console.log("Showing All Users...");
        const users = await User.find({});
        // console.log(users);
        if(users.length === 0) {
            console.log("No users found");
            return res.status(400).json({
                success: false,
                message: "No users found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users found successfully",
            users: users,
        });
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error showing users",
            error: error,
        });
    }
}