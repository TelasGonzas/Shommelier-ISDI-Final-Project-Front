import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, appStore } from '../store/store';
import { useMemo } from 'react';
import { User } from '../models/user.model';
import { loginUserAsync, registerUserAsync } from '../redux/thunks';
import { UserRepository } from '../services/user.repository';
import { ac } from '../redux/user.slice';

export function useUsers() {
  const { users, currentUser, token } = useSelector(
    (state: RootState) => state.users
  );
  const url = 'http://localhost:4206/user';
  const repo: UserRepository = useMemo(() => new UserRepository(url), []);
  const dispatch: AppDispatch = useDispatch();

  const handleRegister = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLogin = async (user: Partial<User>): Promise<boolean> => {
    await dispatch(loginUserAsync({ repo, user }));
    const userLogged = appStore.getState().users.currentUser;
    localStorage.setItem('userToken', userLogged.token as string);
    return !!userLogged.token;
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  return {
    handleRegister,
    handleLogin,
    users,
    currentUser,
    token: token,
    handleGetToken,
  };
}
