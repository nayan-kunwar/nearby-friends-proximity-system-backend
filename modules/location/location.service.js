import { redis } from "../../config/redis.js";
import { GEO_USERS_KEY } from "../../constants/redisKeys.js";

export const saveLocation = async (userId, lat, lng) => {
  await redis.geoAdd(GEO_USERS_KEY, {
    member: userId,
    latitude: lat,
    longitude: lng,
  });
};

export const getNearbyUsers = async (lng, lat, radiusKm) => {
  return redis.geoRadius(
    GEO_USERS_KEY,
    { longitude: lng, latitude: lat },
    radiusKm,
    "km",
    { WITHDIST: true }
  );
};

export const getUserPosition = async (userId) => {
  const [pos] = await redis.geoPos(GEO_USERS_KEY, userId);
  return pos;
};
