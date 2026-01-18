import authModel from "../auth/auth.model.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await authModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
      meta: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};
