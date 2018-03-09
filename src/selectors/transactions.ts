import * as taTypes from '../types/transactions';
import { Store } from '../types/store';
import { Direction, makeSortEntitiesBy } from '../utils/entities';

export const getEntities = (
    state: Store
): {
    [id: string]: taTypes.Transaction;
} => state.transactions.entities;

export const getResults = (state: Store): string[] =>
    state.transactions.results;

export const makeGetSortedResults = (state: Store) => (
    field: string,
    dir: Direction = 1
): string[] =>
    getResults(state)
        .slice()
        .sort(makeSortEntitiesBy(state.transactions.entities, field, dir));
