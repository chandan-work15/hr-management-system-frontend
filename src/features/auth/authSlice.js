import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

const token = getToken();
let role = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    role = decoded.role;
  } catch (err) {
    role = null;
  }
}

const initialState = {
  token: token || null,
  role,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      // localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      // localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
