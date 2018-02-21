import { Store } from '../types/store';

export const getResults = (state: Store): string[] => state.accounts.results;
