import { ApiRepository } from './api.repository';

describe('ApiRepository', () => {
  let repository: ApiRepository<any>;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getAll should fetch data from the correct URL and return the JSON response', async () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const url = 'http://example.com/items';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(data),
    });
    repository = new ApiRepository(url);

    const result = await repository.getAll();

    expect(fetchMock).toHaveBeenCalledWith(url);
    expect(result).toEqual(data);
  });

  test('getAll should throw an error if the response is not OK', async () => {
    const url = 'http://example.com/items';
    const errorMessage = 'Error: 404. Not Found';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    repository = new ApiRepository(url);

    await expect(repository.getAll()).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalled();
  });

  test('get should fetch data for a specific item from the correct URL and return the JSON response', async () => {
    const itemId = 1;
    const item = { id: 1, name: 'Item 1' };
    const url = 'http://example.com/items/' + itemId;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(item),
    });
    repository = new ApiRepository(url);

    const result = await repository.get(itemId);

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toEqual(item);
  });

  test('create should send a POST request to the correct URL with the item data and return the JSON response', async () => {
    const newItem = { name: 'New Item' };
    const createdItem = { id: 1, name: 'New Item' };
    const url = 'http://example.com/items';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createdItem),
    });
    repository = new ApiRepository(url);

    const result = await repository.create(newItem);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual(createdItem);
  });

  test('update should send a PATCH request to the correct URL with the item ID and data and return the JSON response', async () => {
    const itemId = 1;
    const updatedItemData = { name: 'Updated Item' };
    const updatedItem = { id: 1, name: 'Updated Item' };
    const url = `http://example.com/items/${itemId}`;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(updatedItem),
    });
    repository = new ApiRepository(url);

    const result = await repository.update(itemId, updatedItemData);

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toEqual(updatedItem);
  });

  test('delete should send a DELETE request to the correct URL with the item ID and return true if the request is successful', async () => {
    const itemId = 1;
    const url = `http://example.com/items/${itemId}`;
    fetchMock.mockResolvedValueOnce({
      ok: true,
    });
    repository = new ApiRepository(url);

    const result = await repository.delete(itemId);

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test('delete should send a DELETE request to the correct URL with the item ID and return false if the request is not successful', async () => {
    const itemId = 1;
    const url = `http://example.com/items/${itemId}`;
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });
    repository = new ApiRepository(url);

    const result = await repository.delete(itemId);

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
