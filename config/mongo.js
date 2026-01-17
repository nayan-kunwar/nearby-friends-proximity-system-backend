import mongoose from "mongoose";

export const connectMongo = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
  console.log("✅ MongoDB connected");
};
