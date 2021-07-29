import axios from 'axios';

const API_HOST = 'https://lab.magiconch.com/api/nbnhhsh';
const client = axios.create({ baseURL: API_HOST });

interface ExactResponseItem {
  name: string;
  trans: string[];
}

export function isExactResponseItem(item: any): item is ExactResponseItem {
  return !!(item as ExactResponseItem).trans;
}

interface GuessResponseItem {
  name: string;
  inputting: string[];
}

type NbnhhshResponse = ExactResponseItem[] | GuessResponseItem[];

export const guess = (query: string) => {
  return client.post<NbnhhshResponse>('/guess', {
    text: query,
  });
};
