import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import {
  createSneakerAsync,
  deleteSneakerAsync,
  editSneakerAsync,
  getAllSneakersAsync,
} from '../redux/thunks';
import { SneakerRepository } from '../services/sneaker.repository';
import { Sneaker } from '../models/sneaker.model';

export function useSneakers() {
  (state: RootState) => state.sneakers;
  const { sneakers, next, previous } = useSelector(
    (state: RootState) => state.sneakers
  );
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const url = 'http://localhost:4206/sneakers';

  const repo: SneakerRepository = useMemo(
    () => new SneakerRepository(url, token as string),
    [token]
  );

  const handleLoadSneakers = useCallback(async () => {
    dispatch(getAllSneakersAsync({ repo, url }));
  }, [repo, dispatch]);

  const handleCreateSneaker = async (sneaker: FormData) => {
    dispatch(createSneakerAsync({ repo, sneaker }));
  };

  const handleEditSneaker = async (sneaker: Partial<Sneaker>) => {
    dispatch(editSneakerAsync({ repo, sneaker }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSneakerAsync({ id, repo: repo }));
  };

  const handleNextPage = async (url: string) => {
    await dispatch(getAllSneakersAsync({ repo, url }));
  };

  const handlePreviousPage = async (url: string) => {
    await dispatch(getAllSneakersAsync({ repo, url }));
  };

  const handleLoadFiltered = async (status: string) => {
    await dispatch(getAllSneakersAsync({ repo, url, status }));
  };

  const getRandomSneaker = (): Sneaker | undefined => {
    const randomIndex = Math.floor(Math.random() * sneakers.length);
    return sneakers[randomIndex];
  };

  return {
    sneakers,
    repo,
    url,
    handleLoadSneakers,
    handleCreateSneaker,
    handleEditSneaker,
    handleDelete,
    handleNextPage,
    handlePreviousPage,
    handleLoadFiltered,
    next,
    previous,
    getRandomSneaker,
  };
}
