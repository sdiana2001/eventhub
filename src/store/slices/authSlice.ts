import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

  //Это «хранилище» статуса авторизации


interface AuthState {
  user: { id: string; email: string; name: string } | null; //кто вошел
  token: string | null; // какой токен у него
  isAuthenticated: boolean; // вошел ли вообще
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),  // получает значение по ключу 'key'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: { id: string; email: string; name: string }; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
