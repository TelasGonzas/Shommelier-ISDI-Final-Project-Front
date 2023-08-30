import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import Login from './login';
import '@testing-library/jest-dom/extend-expect';
import { useUsers } from '../../hooks/user.hook';

jest.mock('../../hooks/user.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLogin: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('Given login Component', () => {
  test('Then should navigate to registration page when "REGISTER" button is clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const { getByRole } = render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const registerButton = getByRole('button', { name: 'REGISTER' });
    fireEvent.click(registerButton);

    expect(navigateMock).toHaveBeenCalledWith('/register');
  });

  test('renders login form', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginForm = screen.getByText('LOGIN');
    expect(loginForm).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    const handleLogin = jest.fn().mockResolvedValue(true);
    (useUsers as jest.Mock).mockReturnValue({ handleLogin });

    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'SEND' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith({
        user: 'testuser',
        password: 'testpassword',
      });
      expect(screen.queryByText('Invalid username or password.')).toBeNull();
    });
  });

  test('handles form submission with authentication error', async () => {
    const handleLogin = jest.fn().mockResolvedValue(false);
    (useUsers as jest.Mock).mockReturnValue({ handleLogin });

    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'SEND' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith({
        user: 'testuser',
        password: 'testpassword',
      });
      expect(
        screen.getByText('Invalid username or password.')
      ).toBeInTheDocument();
    });
  });

  test('displays error message on empty form submission', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: 'SEND' });

    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Invalid username or password.');
    expect(errorMessage).toBeInTheDocument();
  });
});
