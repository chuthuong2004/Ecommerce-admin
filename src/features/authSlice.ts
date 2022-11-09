import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { IToken, IUser } from '../models/user.model';
import { clearCart } from './cartSlice';

export interface AuthState {
  user: IUser | null;
  token: IToken | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('token', JSON.stringify(action.payload.token));
      }
      if (!state.token) {
        state.user = null;
        state.token = null;
        localStorage.clear();
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
