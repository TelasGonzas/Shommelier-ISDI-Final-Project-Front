import { UserRepository } from '../services/user.repository';
import { appStore } from '../store/store';
import { User } from '../models/user.model';
import {
  createSneakerAsync,
  editSneakerAsync,
  getAllSneakersAsync,
  loginUserAsync,
  registerUserAsync,
} from './thunks';
import { SneakerRepository } from '../services/sneaker.repository';
import { Sneaker } from '../models/sneaker.model';

describe('Given the users slice reducer', () => {
  describe('When it is instantiated', () => {
    const user = {} as Partial<User>;

    const userRepo: UserRepository = {
      url: 'http://localhost:4206',
      getAll: jest.fn(),
      register: jest.fn(),
      login: jest.fn(),
    };

    const sneakerRepo: SneakerRepository = new SneakerRepository(
      'http://localhost:4206/sneakers',
      '1'
    );

    test('Then it should dispatch the registerUserAsync', () => {
      appStore.dispatch(registerUserAsync({ repo: userRepo, user }));
      expect(userRepo.register).toHaveBeenCalled();
    });

    test('Then it should dispatch the loginUserAsync', () => {
      appStore.dispatch(loginUserAsync({ repo: userRepo, user }));
      expect(userRepo.login).toHaveBeenCalled();
    });

    test('Then it should dispatch the getAllSneakersAsync', async () => {
      const getSneakerPayload = {
        repo: sneakerRepo,
        url: 'http://localhost:4206/sneakers',
        status: 'active',
      };

      sneakerRepo.getAll = jest.fn().mockResolvedValue([]);

      await appStore.dispatch(getAllSneakersAsync(getSneakerPayload));
      expect(sneakerRepo.getAll).toHaveBeenCalled();
    });

    test('Then it should dispatch the createSneakerAsync', async () => {
      const sneakerData = new FormData();
      sneakerData.append('name', 'New Sneaker');

      const actionPayload = { repo: sneakerRepo, sneaker: sneakerData };

      sneakerRepo.createSneaker = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'New Sneaker' });

      await appStore.dispatch(createSneakerAsync(actionPayload));

      expect(sneakerRepo.createSneaker).toHaveBeenCalledWith(sneakerData);
    });
    test('Then it should dispatch the editSneakerAsync', async () => {
      const sneakerData = {} as Partial<Sneaker>;

      const actionPayload = { repo: sneakerRepo, sneaker: sneakerData };

      sneakerRepo.editSneaker = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Edited Sneaker' });

      await appStore.dispatch(editSneakerAsync(actionPayload));

      expect(sneakerRepo.editSneaker).toHaveBeenCalledWith(sneakerData);
    });
  });
});
