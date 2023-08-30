import { Sneaker } from './sneaker.model';

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
  sneakers: Sneaker[];
};
