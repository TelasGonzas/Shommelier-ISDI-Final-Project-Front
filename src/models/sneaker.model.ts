import { User } from './user.model';
import { Image } from '../types/image';

export type Sneaker = {
  id: string;
  owner: User;
  sneakerModel: string;
  colorWay: string;
  designer: string;
  year: string;
  status: string;
  retail: string;
  SKU: string;
  image: Image;
  description: string;
};

export type SneakerStructure = { id: string } & Sneaker;

export type SneakerServerResponse = {
  results: SneakerStructure[];
};
