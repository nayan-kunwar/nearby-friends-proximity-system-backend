import Friend from "./friend.model.js";

/**
 * Send friend request
 */
export const sendFriendRequest = async (req, res) => {
  const friendId = req.params.friendId;

  // prevent self-add
  if (friendId === req.user.id)
    return res.status(400).json({ message: "Cannot add yourself" });

  // prevent duplicate
  const exists = await Friend.findOne({
    user: req.user.id,
    friend: friendId,
  });
  if (exists) return res.status(409).json({ message: "Request already sent" });

  await Friend.create({
    user: req.user.id,
    friend: friendId,
    status: "pending",
  });

  res.json({ message: "Friend request sent" });
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
