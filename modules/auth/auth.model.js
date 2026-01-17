import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  username: { type: String, unique: true, trim: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("Auth", schema);
