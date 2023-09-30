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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTQ2N2JmNzE1NGU0ZjA0N2QwOWEyMyIsImlhdCI6MTY5NjAzNTk3MiwiZXhwIjoxNjk2Mjk1MTcyfQ.etEnIcpSKgpz4AWgMcv0RTJsBBOWTjmxNdcrg6E--BU`,
    },
  });
  return res;
};
