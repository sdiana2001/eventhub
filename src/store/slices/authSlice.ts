import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { id: number; email: string; name: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string; id: number; email: string; name: string }>,
    ) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
      };
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.access_token);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;