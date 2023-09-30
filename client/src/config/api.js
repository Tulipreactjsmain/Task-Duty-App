import { instance } from "./connect";

export const loginWithGoogle = async () => {
  try {
    const res = await instance.get("/api/v1/auth/auth/google");
    return res.data;
  } catch (error) {
    console.error("Error while logging in with Google:", error);
    throw error;
  }
};

export const getUserTasks = async () => {
  const res = await instance.get("/api/v1/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
