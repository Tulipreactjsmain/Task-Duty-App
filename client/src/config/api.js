import { instance } from "./connect";

export const registerUser = async (username, email, password) => {
  const res = await instance.post(
    "/auth/register",
    {
      username,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return res;
};

export const loginUser = async (username, password) => {
  const res = await instance.post(
    "/auth/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return res;
};

export const logOutUser = async () => {
  const res = await instance.get("/auth/logout", {
    withCredentials: true,
  });

  return res;
};

export const getUser = async () => {
  const res = await instance.get("/auth/user", {
    withCredentials: true,
  });

  return res;
};

export const loginWithGoogle = async () => {
  try {
    const res = await instance.get("/auth/google", { credentials: true });
    return res.data;
  } catch (error) {
    console.error("Error while logging in with Google:", error);
    throw error;
  }
};

export const retrieveGoogleUser = async () => {
  try {
    const res = await instance.get("/auth/google/taskduty", {
      credentials: true,
    });
    console.log("resss", res);
    return res;
  } catch (error) {
    console.error("Error while logging in with Google:", error);
    throw error;
  }
};

export const getUserTasks = async () => {
  const res = await instance.get("/tasks", {
    withCredentials: true,
  });
  return res.data;
};

export const createNewTask = async (title, description, tags) => {
  const res = await instance.post(
    "/tasks/create",
    { title, description, tags },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const updateTask = async () => {
  const res = await instance.get("/tasks/edit/:taskId", {
    withCredentials: true,
  });
  return res;
};

export const deleteTask = async () => {
  const res = await instance.get("/tasks/delete/:taskId", {
    withCredentials: true,
  });
  return res;
};
