import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
  loginUser,
  registerUser,
  checkAuth,
} from "./authThunk";

const initialState: AuthState = {
  user: null,
  registerLoading: false,
  checkAuthLoading: false,
  loginLoading: false,
  registerError: null,
  loginError: null,
  checkAuthError: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =========================
         REGISTER
      ========================= */

      .addCase(
        registerUser.pending,
        (state) => {
          state.registerLoading =
            true;

          state.registerError =
            null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.registerLoading =
            false;

          state.user =
            action.payload.user;

          state.isAuthenticated =
            true;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.registerLoading =
            false;

          state.registerError =
            action.payload ??
            "Registration failed";
        }
      )

      /* =========================
         LOGIN
      ========================= */

      .addCase(
        loginUser.pending,
        (state) => {
          state.loginLoading =
            true;

          state.loginError =
            null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loginLoading =
            false;

          state.user =
            action.payload.user;

          state.isAuthenticated =
            true;
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loginLoading =
            false;

          state.loginError =
            action.payload ??
            "Login failed";
        }
      )

      /* =========================
         CHECK AUTH
      ========================= */

      .addCase(
        checkAuth.pending,
        (state) => {
          state.checkAuthLoading =
            true;

          state.checkAuthError =
            null;
        }
      )

      .addCase(
        checkAuth.fulfilled,
        (state, action) => {
          state.checkAuthLoading =
            false;

          state.user =
            action.payload.user;

          state.isAuthenticated =
            true;
        }
      )

      .addCase(
        checkAuth.rejected,
        (state, action) => {
          state.checkAuthLoading =
            false;

          state.user = null;

          state.isAuthenticated =
            false;

          state.checkAuthError =
            action.payload ??
            "Authentication failed";
        }
      );
  },
});

export default authSlice.reducer;