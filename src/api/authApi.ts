import api from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  sessionData?: Record<string, unknown>;
}

export interface LoginPayload {
  email: string;
  password: string;
  sessionData?: Record<string, unknown>;
}

export const registerRequest = (data: RegisterPayload) => {
  return api.post<AuthResponse>("/auth/register", data);
};

export const loginRequest = (data: LoginPayload) => {
  return api.post<AuthResponse>("/auth/login", data);
};

export const logoutRequest = (token: string) => {
  return api.post<void>(
    "/auth/logout",
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};