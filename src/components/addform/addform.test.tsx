import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import '@testing-library/jest-dom/extend-expect';
import { useSneakers } from '../../hooks/sneaker.hook';
import SneakerAddForm from './addform';

jest.mock('../../hooks/sneaker.hook', () => ({
  useSneakers: jest.fn().mockReturnValue({
    handleCreateSneaker: jest.fn(),
  }),
}));

describe('sneakerAddForm Component', () => {
  test('submits the form correctly', () => {
    const handleCreateSneaker = jest.fn();
    (useSneakers as jest.Mock).mockReturnValue({ handleCreateSneaker });

    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <SneakerAddForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByRole('form');
    const sneakerModelInput = screen.getByLabelText('MODEL');
    const colorWayInput = screen.getByLabelText('COLORWAY');

    fireEvent.change(sneakerModelInput, { target: { value: 'Sneaker Model' } });
    fireEvent.change(colorWayInput, { target: { value: 'Red' } });
    fireEvent.submit(formElement);

    expect(handleCreateSneaker).toHaveBeenCalledWith(expect.any(FormData));
    const formData = handleCreateSneaker.mock.calls[0][0] as FormData;
    expect(formData.get('sneakerModel')).toBe('Sneaker Model');
    expect(formData.get('colorWay')).toBe('Red');
  });
});
