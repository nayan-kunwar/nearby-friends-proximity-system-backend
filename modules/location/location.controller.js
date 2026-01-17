import Friend from "../friend/friend.model.js";
import {
  saveLocation,
  getNearbyUsers,
  getUserPosition,
} from "./location.service.js";

export const updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  await saveLocation(req.user.id, latitude, longitude);
  res.json({ success: true });
};

export const nearbyUsers = async (req, res) => {
  const radius = Number(req.query.radius || 5);

  const pos = await getUserPosition(req.user.id);
  if (!pos) return res.json([]);

  const [lng, lat] = pos.map(Number);

  const nearby = await getNearbyUsers(lng, lat, radius);

  const relations = await Friend.find({
    $or: [{ user: req.user.id }, { friend: req.user.id }],
  });

  const relationMap = new Map();

  relations.forEach((r) => {
    const otherUser =
      r.user.toString() === req.user.id
        ? r.friend.toString()
        : r.user.toString();

    relationMap.set(otherUser, r.status);
  });

  const result = nearby
    .filter(([userId]) => userId !== req.user.id.toString())
    .map(([userId, distance]) => ({
      userId,
      distanceKm: Number(distance),
      relationship: relationMap.get(userId) || "none",
    }));

  res.json(result);
};
