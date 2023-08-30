import { Sneaker } from '../models/sneaker.model';
import { User } from '../models/user.model';

export type ApiAnswer = {
  items: Sneaker[];
  next: string | null;
  previous: string | null;
  count: number;
};

export type ApiResponse = {
  token: string;
  user: User[];
};
