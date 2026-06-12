import { requestWithRetry } from "../../api/apiRequest";
import type {UserResponse,LoginRequest,RegisterRequest} from "./authTypes";

export const registerService = (payload: RegisterRequest) => {
  return requestWithRetry<UserResponse>({
    url: "/auth/register",
    method: "POST",
    data: payload,
  });
};

export const loginService = (payload: LoginRequest) => {
  return requestWithRetry<UserResponse>({
    url: "/auth/login",
    method: "POST",
    data: payload,
  });
};

export const checkAuthService = () => {
  return requestWithRetry<UserResponse>({
    url: "/auth/check-auth",
    method: "GET",
  });
};