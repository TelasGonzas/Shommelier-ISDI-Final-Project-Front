import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sneaker } from '../models/sneaker.model';
import { User } from '../models/user.model';
import {
  createSneakerAsync,
  deleteSneakerAsync,
  editSneakerAsync,
  getAllSneakersAsync,
} from './thunks';

export type SneakerState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string;
  sneakers: Sneaker[];
  count: number;
  next: string | null;
  previous: string | null;
};

const initialState: SneakerState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem('userToken') || undefined,
  sneakers: [] as Sneaker[],
  count: 0,
  next: null,
  previous: null,
};

const sneakerSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSneakersAsync.fulfilled, (state, { payload }) => ({
      ...state,
      sneakers: payload.items,
      count: payload.count,
      next: payload.next,
      previous: payload.previous,
    }));
    builder.addCase(createSneakerAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }));
    builder.addCase(editSneakerAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }));
    builder.addCase(deleteSneakerAsync.fulfilled, (state, { payload }) => {
      return {
        ...state,
        sneakers: state.sneakers.filter((sneaker) => sneaker.id !== payload),
      };
    });
  },
});

export default sneakerSlice.reducer;
