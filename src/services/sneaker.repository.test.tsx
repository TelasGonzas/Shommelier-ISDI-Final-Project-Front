import { SneakerRepository } from './sneaker.repository';

describe('SneakerRepository', () => {
  let repository: SneakerRepository;
  const url = 'http://localhost:4206';

  beforeEach(() => {
    const token = '1';
    repository = new SneakerRepository(url, token);
  });

  test('should fetch and return all sneakers', async () => {
    const sneakers = {
      item: [
        { id: 1, name: 'Sneaker 1' },
        { id: 2, name: 'Sneaker 2' },
      ],
    };

    const response = { sneakers };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(response),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4206/',
    });

    const result = await repository.getAll();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4206');
    expect(result).toBe(response);
  });

  test('should throw an error when fetch fails', async () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: 'http://localhost:4206/sneakers',
    });

    await expect(repository.getAll()).rejects.toThrowError(
      `Error: ${errorResponse.status}. ${errorResponse.statusText}`
    );
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4206');
  });

  test('should fetch and return a specific sneaker', async () => {
    const sneaker = { id: 1, name: 'Sneaker 1' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(sneaker),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4206/id',
    });

    const result = await repository.getSneaker('1');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4206/id');
    expect(result).toEqual(sneaker);
  });

  test('should throw an error when fetching a specific sneaker fails', async () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: 'http://localhost:4206/id',
    });

    await expect(repository.getSneaker('1')).rejects.toThrowError(
      `Error: ${errorResponse.status}. ${errorResponse.statusText}`
    );
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4206/id');
  });
  test('should create a new sneaker', async () => {
    const sneakerData = new FormData();
    sneakerData.append('name', 'New Sneaker');

    const createdSneaker = { id: 1, name: 'New Sneaker' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(createdSneaker),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4206/sneakers/',
    });

    const result = await repository.createSneaker(sneakerData);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4206/', {
      method: 'POST',
      body: sneakerData,
      headers: { Authorization: expect.stringContaining('Bearer') },
    });
    expect(result).toEqual(createdSneaker);
  });
  test('should edit a sneaker', async () => {
    const sneaker = { id: '1', name: 'Sneaker 1' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(sneaker),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4206/sneakers/1',
    });

    const editedSneakerData = { id: '1', name: 'Updated Sneaker' };

    const result = await repository.editSneaker(editedSneakerData);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(sneaker);
  });
});
