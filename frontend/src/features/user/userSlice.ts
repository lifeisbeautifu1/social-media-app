import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

type initialStateType = {
  user: IUser | null;
};

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    follow: (state, action) => {
      state?.user?.following?.push(action.payload);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    unfollow: (state, action) => {
      state.user.following = state.user.following.filter(
        (id: string) => id !== action.payload
      );
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout, follow, unfollow } = userSlice.actions;

export default userSlice.reducer;
