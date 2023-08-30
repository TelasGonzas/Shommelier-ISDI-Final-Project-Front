import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginUserAsync, registerUserAsync } from './thunks';
import { User } from '../models/user.model';

export type UserLogged = {
  id: string;
  userName: string;
  email: string;
};

type UserState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string;
};

const initialState: UserState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem('userToken') as string | undefined,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }));
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
export const ac = userSlice.actions;
