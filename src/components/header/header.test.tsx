import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from './header';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders header with title', () => {
  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  const titleElement = screen.getByText('"SHOEMMELIER"');
  expect(titleElement).toBeInTheDocument();
});

test('calls handleAddForm when "ADDSNEAKER" button is clicked', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  const addButton = screen.getByText('ADDSNEAKER');
  fireEvent.click(addButton);

  expect(mockNavigate).toHaveBeenCalledWith('/addform');
});

test('calls handleLogOut when "LOGOUT" button is clicked', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  const logoutButton = screen.getByText('LOGOUT');
  fireEvent.click(logoutButton);

  expect(mockNavigate).toHaveBeenCalledWith('/');
});
