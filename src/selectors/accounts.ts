import { Store } from '../types/store';
import { Account } from '../types/account';

enum Direction {
    ASC = 1,
    DESC = -1,
}

export const getResults = (state: Store): string[] => state.accounts.results;
export const getEntities = (state: Store): { [id: string]: Account } =>
    state.accounts.entities;

export const makeSortedResults = (state: Store) => (
    field: string,
    dir: Direction = Direction.ASC
): string[] =>
    getResults(state)
        .slice()
        .sort((a, b) => {
            const valA = state.accounts.entities[a][field];
            const valB = state.accounts.entities[b][field];
            if (valA > valB) {
                return dir;
            }

            return dir * -1;
        });
