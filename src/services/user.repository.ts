import { User } from '../models/user.model';
import { ApiResponse } from '../types/api.response';

export class UserRepository {
  constructor(public url: string) {}

  async getAll(): Promise<User[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const data = response.json() as Promise<ApiResponse>;
    return (await data).user;
  }

  async register(item: Partial<User>): Promise<User> {
    const response = await fetch(`${this.url}/register`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });

    return response.json() as Promise<User>;
  }

  async login(item: Partial<User>): Promise<User> {
    const response = await fetch(`${this.url}/login`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json() as Promise<User>;
  }
}
