import axiosInstance from "./axiosInstance";

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/admin/login", payload);
  return response.data;
};
