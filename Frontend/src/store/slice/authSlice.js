import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticate: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticate = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticate = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
