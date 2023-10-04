import { user } from "../config/api";

export const fetchUserData = async () => {
  try {
    const res = await user();
    if (res.status === 200) {
      return res.data.user;
    } else {
      throw new Error(`User data fetch failed with status ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
