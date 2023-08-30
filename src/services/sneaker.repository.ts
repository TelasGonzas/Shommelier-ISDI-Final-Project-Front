import { Sneaker } from '../models/sneaker.model';
import { ApiAnswer } from '../types/api.response';

export class SneakerRepository {
  constructor(public url: string, public token: string) {}

  async getAll(url = this.url, status?: string): Promise<ApiAnswer> {
    let urlToSend = '';
    !status ? (urlToSend = url) : (urlToSend = `${url}?${status}`);
    const response = await fetch(urlToSend);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const answer = (await response.json()) as ApiAnswer;
    return answer;
  }

  async getSneaker(_id: Sneaker['id']): Promise<Sneaker> {
    const response = await fetch(`${this.url}/id`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const data = (await response.json()) as Sneaker;
    return data;
  }

  async createSneaker(item: FormData): Promise<Sneaker> {
    const response = await fetch(`${this.url}/`, {
      method: 'POST',
      body: item,
      headers: { Authorization: 'Bearer' + this.token },
    });
    return response.json() as Promise<Sneaker>;
  }

  async editSneaker(item: Partial<Sneaker>): Promise<Sneaker> {
    const response = await fetch(`${this.url}/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.token,
      },
    });
    return response.json() as Promise<Sneaker>;
  }

  async deleteById(id: Sneaker['id']) {
    const url = `${this.url}/${id}`;
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer${this.token}`,
      },
    });
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
  }
}
