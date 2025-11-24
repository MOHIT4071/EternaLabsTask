import sample from '../mocks/sampleTokens.json';
import { Token } from '../types/token';

export async function fetchTokens(): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 700));
  return sample as Token[];
}
