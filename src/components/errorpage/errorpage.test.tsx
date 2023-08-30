import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Error from './errorpage';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Error component', () => {
  test('renders the error message and button', () => {
    render(<Error />);

    const errorMessage = screen.getByText(/404 NOT FOUND/i);
    const button = screen.getByText(/JUST GO HOME/i);

    expect(errorMessage).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('navigates to home when button is clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<Error />);

    const button = screen.getByText(/JUST GO HOME/i);

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalled();
  });
});
