import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import '@testing-library/jest-dom';
import Detail from './detail';
import { useSneakers } from '../../hooks/sneaker.hook';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/sneaker.hook', () => ({
  useSneakers: jest.fn().mockReturnValue({
    sneakers: [
      {
        id: '1',
        sneakerModel: 'Jordan3',
        colorWay: 'UNC',
        designer: 'Tinker Hatfield',
        year: '2020',
        retail: '220',
        SKU: 'sahjfdnaks',
        status: 'DS',
        image: { url: 'j3.jpg' },
        description: 'Yo paso tío',
        owner: 'mj23',
      },
    ],
  }),
}));

describe('Given SneakerDetail component', () => {
  test('renders the detail card with correct data', () => {
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Provider store={appStore}>
          <Detail />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('UNC')).toBeInTheDocument();
  });

  test('navigates to the Edit page when Edit button is clicked', () => {
    const navigate = jest.fn();
    (useSneakers as jest.Mock).mockReturnValue({
      sneakers: [
        {
          id: '1',
          sneakerModel: 'Jordan3',
          colorWay: 'UNC',
          designer: 'Tinker Hatfield',
          year: '2020',
          retail: '220',
          SKU: 'sahjfdnaks',
          status: 'DS',
          image: { url: 'j3.jpg' },
          description: 'Yo paso tío',
          owner: 'mj23',
        },
      ],
    });
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Provider store={appStore}>
          <Detail />
        </Provider>
      </MemoryRouter>
    );

    const editButton = screen.getByText('EDIT');
    fireEvent.click(editButton);

    expect(navigate).toHaveBeenCalledWith('/editform/1');
  });
  test('navigates to the Home page when goBACK button is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Provider store={appStore}>
          <Detail />
        </Provider>
      </MemoryRouter>
    );

    const goBackButton = screen.getByText('GOBACK');
    fireEvent.click(goBackButton);

    expect(navigate).toHaveBeenCalledWith('/home');
  });
  test('renders nothing when sneaker is undefined', () => {
    (useSneakers as jest.Mock).mockReturnValue({
      sneakers: [],
    });

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Provider store={appStore}>
          <Detail />
        </Provider>
      </MemoryRouter>
    );

    const listElement = screen.queryByTestId('list');

    expect(listElement).not.toBeInTheDocument();
  });
});
