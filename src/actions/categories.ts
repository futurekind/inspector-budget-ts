import { Category } from '../types/category';

export const CAT__CREATE = 'CAT__CREATE';
export type CAT__CREATE = typeof CAT__CREATE;

export const CAT__UPDATE = 'CAT__UPDATE';
export type CAT__UPDATE = typeof CAT__UPDATE;

interface Action {
    type: CAT__CREATE | CAT__UPDATE;
    payload: Category;
}

export const create = (category: Category): Action => ({
    type: CAT__CREATE,
    payload: category,
});

export const update = (category: Category): Action => ({
    type: CAT__UPDATE,
    payload: category,
});
