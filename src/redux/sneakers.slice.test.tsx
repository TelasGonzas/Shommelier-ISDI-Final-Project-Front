import { configureStore } from '@reduxjs/toolkit';
import userReducer, { ac as userActions } from './user.slice';
import sneakerReducer from './sneakers.slice';

describe('Sneakers Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: userReducer,
        sneakers: sneakerReducer,
      },
    });
  });

  test('Should update the token in the state', () => {
    const newToken = 'Token';
    store.dispatch(userActions.getToken(newToken));
    const state = store.getState().users;
    expect(state.token).toBe(newToken);
  });

  test('Should set the token to undefined in the state', () => {
    store.dispatch(userActions.logout());
    const state = store.getState().users;
    expect(state.token).toBeNull();
  });
});
