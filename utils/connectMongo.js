import mongoose from "mongoose";

const connectMongo = async () => {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB...');
}

export default connectMongo;