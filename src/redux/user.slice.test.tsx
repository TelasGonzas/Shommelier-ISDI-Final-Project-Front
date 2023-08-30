import { appStore } from '../store/store';

import { ac } from './user.slice';

describe('Given the users slice reducer', () => {
  describe('When it is instantiated', () => {
    test('Then it should update the token in the state', () => {
      const newToken = 'Token';
      appStore.dispatch(ac.getToken(newToken));
      const state = appStore.getState().users;
      expect(state.token).toBe(newToken);
    });

    test('Then it should set the token to undefined in the state', () => {
      appStore.dispatch(ac.logout());
      const state = appStore.getState().users;
      expect(state.token).toBe(null);
    });
  });
});
