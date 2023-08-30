import { render, screen } from '@testing-library/react';
import Home from './home';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import '@testing-library/jest-dom/extend-expect';

test('renders Home component correctly', () => {
  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  const sneakerElements = screen.getByRole('list');
  expect(sneakerElements).toBeInTheDocument();
});
