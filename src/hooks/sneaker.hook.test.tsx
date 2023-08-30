import { useDispatch, useSelector } from 'react-redux';
import { useSneakers } from './sneaker.hook';
import { createSneakerAsync, editSneakerAsync } from '../redux/thunks';
import { SneakerRepository } from '../services/sneaker.repository';
import { renderHook } from '@testing-library/react';
import { Sneaker } from '../models/sneaker.model';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/thunks', () => ({
  getAllSneakersAsync: jest.fn(),
  createSneakerAsync: jest.fn(),
  editSneakerAsync: jest.fn(),
}));

describe('useSneakers', () => {
  const dispatchMock = jest.fn();

  const userMock = { users: [], token: '1' };
  const sneakersMock = { sneakers: [] };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as jest.Mock).mockImplementation((callback) =>
      callback({ sneakers: sneakersMock, users: userMock })
    );
  });

  test('should call useDispatch and useSelector', () => {
    renderHook(() => useSneakers());

    expect(useDispatch).toHaveBeenCalled();
    expect(useSelector).toHaveBeenCalled();
  });

  test('should dispatch getAllSneakersAsync with the correct repository', () => {
    const { result } = renderHook(() => useSneakers());

    result.current.handleLoadSneakers();

    expect(dispatchMock).toHaveBeenCalled();
  });

  test('should dispatch handleCreateSneaker with the correct repository', () => {
    const sneakerMock = {} as FormData;
    const repo: SneakerRepository = new SneakerRepository(
      'http://localhost:4206',
      '1'
    );

    const { result } = renderHook(() => useSneakers());

    result.current.handleCreateSneaker(sneakerMock);

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(
      createSneakerAsync({ repo, sneaker: sneakerMock })
    );
  });
  test('should dispatch handleEditSneaker with the correct repository', () => {
    const sneakerMock = {} as Partial<Sneaker>;
    const repo: SneakerRepository = new SneakerRepository(
      'http://localhost:4206',
      '1'
    );

    const { result } = renderHook(() => useSneakers());

    result.current.handleEditSneaker(sneakerMock);

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(
      editSneakerAsync({ repo, sneaker: sneakerMock })
    );
  });
});
