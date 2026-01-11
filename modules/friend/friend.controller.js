import Friend from "./friend.model.js";

export const addFriend = async (req, res) => {
  await Friend.create({
    user: req.user.id,
    friend: req.params.friendId,
  });

  res.json({ message: "Friend added" });
};
