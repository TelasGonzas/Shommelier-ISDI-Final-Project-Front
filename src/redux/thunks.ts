import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { UserRepository } from '../services/user.repository';
import { SneakerRepository } from '../services/sneaker.repository';
import { Sneaker } from '../models/sneaker.model';
import { ApiAnswer } from '../types/api.response';

interface GetSneakerPayload {
  repo: SneakerRepository;
  url: string;
  status?: string;
}

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; user: Partial<User> }
>('/register', async ({ repo, user }) => {
  return await repo.register(user);
});

export const loginUserAsync = createAsyncThunk<
  Partial<User>,
  { repo: UserRepository; user: Partial<User> }
>('/login', async ({ repo, user }) => {
  const result = await repo.login(user);
  return result;
});

export const editSneakerAsync = createAsyncThunk<
  Partial<Sneaker>,
  { repo: SneakerRepository; sneaker: Partial<Sneaker> }
>('/editform', async ({ repo, sneaker }) => {
  const result = await repo.editSneaker(sneaker);
  return result;
});

export const getAllSneakersAsync = createAsyncThunk<
  ApiAnswer,
  GetSneakerPayload
>('/get', async ({ repo, url, status }) => {
  const response = await repo.getAll(url, status);
  return response;
});

export const createSneakerAsync = createAsyncThunk<
  Sneaker,
  { repo: SneakerRepository; sneaker: FormData }
>('/add', async ({ repo, sneaker }) => {
  return await repo.createSneaker(sneaker);
});

export const deleteSneakerAsync = createAsyncThunk<
  string,
  { id: string; repo: SneakerRepository },
  { rejectValue: string }
>('sneakers/delete', async ({ id, repo }, thunkAPI) => {
  try {
    if (!id) {
      throw new Error('Invalid ID');
    }

    await repo.deleteById(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue('bad Id');
  }
});
