import { instance, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "./connect";
import axios from "axios";

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

export const updateUser = async (profile) => {
  const res = await instance.post(
    "/auth/update",
    {
      profile,
    },
    {
      withCredentials: true,
    }
  );
  return res.data.user;
};

export const forgotPassword = async (email) => {
  const res = await instance.post("/auth/forgot-password", {
    email,
  });

  return res;
};

export const resetPassword = async (token, newPassword) => {
  const res = await instance.post(`/auth/reset-password/${token}`, {
    newPassword,
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

export const getSingleTask = async (taskId) => {
  const res = await instance.get(`/tasks/${taskId}`, {
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

export const updateTask = async (title, description, tags, taskId) => {
  const res = await instance.post(
    `/tasks/edit/${taskId}`,
    { title, description, tags },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const deleteTask = async (taskId) => {
  const res = await instance.delete(`/tasks/delete/${taskId}`, {
    withCredentials: true,
  });
  return res;
};


export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const data = await axios.post(CLOUDINARY_URL, formData);
  return data;
};