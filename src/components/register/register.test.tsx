import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Register from './register';
import { appStore } from '../../store/store';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Swal from 'sweetalert2';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/user.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleRegister: jest.fn(),
  }),
}));

describe('Given register form', () => {
  describe('When register form is used', () => {
    const navigateMock = jest.fn();
    beforeEach(() => {
      (useNavigate as jest.Mock).mockReturnValue(navigateMock);

      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        </Provider>
      );
    });

    test('should fill in the register form and submit', () => {
      const usernameInput = screen.getByLabelText(
        'Username:'
      ) as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        'Password:'
      ) as HTMLInputElement;
      const submitButton = screen.getByText('SEND');

      userEvent.type(usernameInput, 'nitin');
      userEvent.type(emailInput, 'nitin@nitin.nitin');
      userEvent.type(passwordInput, 'nitin');

      fireEvent.click(submitButton);

      expect(usernameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
    test('should render register form', () => {
      const registerForm = screen.getByRole('heading', { name: 'REGISTER' });

      expect(registerForm).toBeInTheDocument();
    });

    test('should navigate to login page when "goLOGIN" button is clicked', () => {
      const goLoginButton = screen.getByRole('button', { name: /LOGIN/i });
      fireEvent.click(goLoginButton);

      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Register Component', () => {
  test('displays error message and stays on registration page when any field is empty', async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText(
      'Username:'
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      'Password:'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Send/i });

    userEvent.type(usernameInput, '');
    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/register');
    });

    expect(usernameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(navigateMock).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();
  });
});
