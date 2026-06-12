import { createAsyncThunk } from "@reduxjs/toolkit";
import {checkAuthService,loginService,registerService} from "./authService";
import type {UserResponse,LoginRequest,RegisterRequest} from "./authTypes";

export const registerUser = createAsyncThunk<UserResponse,RegisterRequest,{rejectValue: string}>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      return await registerService(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

export const loginUser = createAsyncThunk<UserResponse,LoginRequest,{rejectValue: string }>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await loginService(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

export const checkAuth = createAsyncThunk<UserResponse,void,{rejectValue: string;}>(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      return await checkAuthService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);