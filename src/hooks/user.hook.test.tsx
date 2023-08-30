import { User } from '../models/user.model';
import '@testing-library/jest-dom';
import { useUsers } from './user.hook';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import { UserRepository } from '../services/user.repository';
import userEvent from '@testing-library/user-event';
import { ac } from '../redux/user.slice';
import { loginUserAsync, registerUserAsync } from '../redux/thunks';

const mockUser = {
  userName: 'mariko',
  email: 'mariko@elquelolea.com',
} as unknown as User;
const mockRepo = {
  register: jest.fn(),
  login: jest.fn(),
} as unknown as UserRepository;
const mockToken = 'maritoken';
function TestComponent() {
  const { handleRegister, handleLogin, handleGetToken } = useUsers();

  return (
    <>
      <button onClick={() => handleRegister(mockUser)}></button>
      <button onClick={() => handleLogin(mockUser)}></button>
      <button onClick={() => handleGetToken(mockToken)}></button>
    </>
  );
}

describe('Given the useUsers custom hook', () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <Router>
          <Provider store={appStore}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      )
    );
    elements = screen.getAllByRole('button');
  });
  describe('When is rendered', () => {
    test('Then the handleRegisterUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        appStore.dispatch(
          registerUserAsync({ repo: mockRepo, user: mockUser })
        );
        expect(mockRepo.register).toHaveBeenCalled();
      });
    });

    test('Then the handleLoginUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        appStore.dispatch(loginUserAsync({ repo: mockRepo, user: mockUser }));
        expect(mockRepo.login).toHaveBeenCalled();
      });
    });

    test('Then the handleGetToken function should be called', async () => {
      await userEvent.click(elements[2]);
      appStore.dispatch(ac.getToken(mockToken));
    });
  });
});
