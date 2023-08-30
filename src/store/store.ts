import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user.slice';
import sneakersSlice from '../redux/sneakers.slice';

export const appStore = configureStore({
  reducer: {
    users: userReducer,
    sneakers: sneakersSlice,
  },
});

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppStore = typeof appStore;
