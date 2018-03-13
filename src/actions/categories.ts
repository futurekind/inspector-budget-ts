import { Category } from '../types/category';

export const CAT__CREATE = 'CAT__CREATE';
export type CAT__CREATE = typeof CAT__CREATE;

export const CAT__UPDATE = 'CAT__UPDATE';
export type CAT__UPDATE = typeof CAT__UPDATE;

export const CAT__DELETE = 'CAT__DELETE';
export type CAT__DELETE = typeof CAT__DELETE;

export interface Action {
    type: CAT__CREATE | CAT__UPDATE | CAT__DELETE;
    payload: Category | string;
}

export const create = (category: Category): Action => ({
    type: CAT__CREATE,
    payload: category,
});

export const update = (category: Category): Action => ({
    type: CAT__UPDATE,
    payload: category,
});

export const remove = (id: string): Action => ({
    type: CAT__DELETE,
    payload: id,
});
