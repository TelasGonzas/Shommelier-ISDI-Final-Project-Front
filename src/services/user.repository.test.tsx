import { UserRepository } from './user.repository';

describe('Given UserRepository', () => {
  describe('When getAll is used', () => {
    test('Then should fetch data from the API and return the response', async () => {
      const expectedUrl = 'localhost:4206/users';
      const mockResponse = {
        items: [
          {
            id: 1,
            name: 'Juan Arquitecto',
            email: 'juanarquitecto@example.com',
          },
          {
            id: 2,
            name: 'Mamma Mia',
            email: 'mammamia@example.com',
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository(expectedUrl);
      const response = await userRepository.getAll();

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(undefined);
    });

    test('Then should throw an error if the fetch is not successful', async () => {
      const expectedUrl = 'localhost:4206/users';
      const mockErrorMessage = 'Error';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Error',
      });

      const userRepository = new UserRepository(expectedUrl);

      await expect(userRepository.getAll()).rejects.toThrow(mockErrorMessage);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('When register is used', () => {
    test('Then should send a POST request to the API and return the response', async () => {
      const expectedUrl = 'localhost:4206/users/register';
      const mockItem = {
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
        password: 'password',
      };
      const mockResponse = {
        id: 1,
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository('localhost:4206/users');
      const response = await userRepository.register(mockItem);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        body: JSON.stringify(mockItem),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('When login is used', () => {
    test('should send a PATCH request to the API and return the response', async () => {
      const expectedUrl = 'localhost:4206/users/login';
      const mockItem = {
        email: 'juanarquitecto@example.com',
        password: 'password',
      };
      const mockResponse = {
        id: 1,
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository('localhost:4206/users');
      const response = await userRepository.login(mockItem);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'PATCH',
        body: JSON.stringify(mockItem),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(mockResponse);
    });
  });
});
