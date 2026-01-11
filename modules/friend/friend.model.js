import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  friend: mongoose.Types.ObjectId,
  status: { type: String, default: "accepted" },
});

export default mongoose.model("Friend", schema);
