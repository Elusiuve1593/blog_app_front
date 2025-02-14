import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../types";

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    enableAccess(state, action: PayloadAction<{ token: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    disableAccess(state, action: PayloadAction<{ logout: boolean }>) {
      state.isAuthenticated = action.payload.logout;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { enableAccess, disableAccess } = authSlice.actions;
export default authSlice.reducer;