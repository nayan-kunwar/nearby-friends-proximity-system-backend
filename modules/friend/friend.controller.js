import { ERROR_CODES } from "../../constants/errorCodes.js";
import { logger } from "../../utils/logger.js";
import Friend from "./friend.model.js";
import FriendRequestModel from "./FriendRequest.model.js";

/**
 * Send friend request
 */
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.friendId;

    // 1️⃣ Prevent self request
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself",
      });
    }

    // 2️⃣ Already friends?
    const alreadyFriends = await Friend.findOne({
      user: senderId,
      friend: receiverId,
    });

    if (alreadyFriends) {
      return res.status(409).json({
        message: "You are already friends",
      });
    }

    // 3️⃣ Existing pending request (either direction)
    const existingRequest = await FriendRequestModel.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: "pending" },
        { sender: receiverId, receiver: senderId, status: "pending" },
      ],
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "Friend request already exists",
      });
    }

    // 4️⃣ Create request
    await FriendRequestModel.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Friend request sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to send friend request",
    });
  }
};

/**
 * Accept friend request
 */
export const acceptFriendRequest = async (req, res) => {
  const friendId = req.params.friendId;

  const request = await Friend.findOne({
    user: friendId,
    friend: req.user.id,
    status: "pending",
  });

  if (!request) return res.status(404).json({ message: "Request not found" });

  // accept request
  request.status = "accepted";
  await request.save();

  // create reverse relation
  await Friend.create({
    user: req.user.id,
    friend: friendId,
    status: "accepted",
  });

  res.json({ message: "Friend request accepted" });
};

/**
 * Get friend list
 */
export const getFriends = async (req, res) => {
  const friends = await Friend.find({
    user: req.user.id,
    status: "accepted",
  }).select("friend");

  res.json(friends.map((f) => f.friend));
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await FriendRequestModel.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "fullName email")
      .sort({ createdAt: -1 });

    logger.info("Friend requests fetched successfully", { requestId: req.id });
    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
      errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
    });
  }
};
