import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from "../../api/authApi";
import {getCurrentUser, uploadAvatar} from "../user/operations";

export interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const storedToken = localStorage.getItem(TOKEN_KEY);
const storedUser = localStorage.getItem(USER_KEY);

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
};

export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const response = await registerRequest(payload);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue("Registration failed");
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await loginRequest(payload);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue("Login failed");
  }
});

export const logoutThunk = createAsyncThunk<void, void, { state: { auth: AuthState } }>(
  "auth/logout",
  async (_arg, { getState }) => {
    const { token } = getState().auth;
    if (!token) return;
    await logoutRequest(token);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload;
          localStorage.setItem(USER_KEY, JSON.stringify(state.user));
        }
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;