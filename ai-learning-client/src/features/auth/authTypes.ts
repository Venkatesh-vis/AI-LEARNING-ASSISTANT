export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateProfileRequest = {
  username?: string;
  email?: string;
  profilePicture?: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserResponse = {
  user: User;
};

export type AuthState = {
  user: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  checkAuthLoading: boolean;
  registerError: string | null;
  loginError: string | null;
  checkAuthError: string | null;
  isAuthenticated: boolean;
};