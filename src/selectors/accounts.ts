import { Store } from '../types/store';
import { Account } from '../types/account';
import { Direction, makeSortEntitiesBy } from '../utils/entities';

export const getResults = (state: Store): string[] => state.accounts.results;
export const getEntities = (state: Store): { [id: string]: Account } =>
    state.accounts.entities;

export const makeSortedResults = (state: Store) => (
    field: string,
    dir: Direction = Direction.ASC
): string[] =>
    getResults(state)
        .slice()
        .sort(makeSortEntitiesBy(getEntities(state), field, dir));
