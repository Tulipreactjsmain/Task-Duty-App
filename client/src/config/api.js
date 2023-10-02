import { instance } from "./connect";

export const loginWithGoogle = async () => {
  try {
    // const headers = {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',

    // };

    const res = await instance.get("/auth/google", { credentials: true });
    return res.data;
  } catch (error) {
    console.error("Error while logging in with Google:", error);
    throw error;
  }
};

export const retrieveGoogleUser = async () => {
  try {
    const res = await instance.get("/auth/google/taskduty", { credentials: true });
    console.log("resss", res);
    return res;
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
