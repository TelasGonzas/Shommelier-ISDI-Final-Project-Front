import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SneakerCard } from '../card/card';
import { Sneaker } from '../../models/sneaker.model';
import { User } from '../../models/user.model';
import '@testing-library/jest-dom';

describe('SneakerCard component', () => {
  test('renders sneaker details correctly', () => {
    const user: User = {
      id: '1',
      username: 'JohnDoe',
      email: 'john@example.com',
      password: 'password',
      token: 'token',
      sneakers: [],
    };

    const sneaker: Sneaker = {
      id: '1',
      owner: user,
      sneakerModel: 'Sneaker 1',
      colorWay: 'Red',
      designer: 'Designer',
      year: '2023',
      status: 'DS',
      retail: '100',
      SKU: 'ABC123',
      image: {
        urlOriginal: 'original-url',
        url: 'image-url',
        mimetype: 'image/jpeg',
        size: 1000,
      },
      description: 'This is a sneaker',
    };

    render(
      <MemoryRouter>
        <SneakerCard sneaker={sneaker} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('button');
    expect(linkElement).toBeDefined();

    const sneakerModel = screen.getByText('SNEAKER 1');
    expect(sneakerModel).toBeDefined();

    const colorWay = screen.getByText('RED');
    expect(colorWay).toBeDefined();
  });
});
