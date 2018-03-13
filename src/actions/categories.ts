import { Category } from '../types/category';

export const CAT__CREATE = 'CAT__CREATE';
export type CAT__CREATE = typeof CAT__CREATE;

interface Action {
    type: CAT__CREATE;
    payload: Category;
}

export const create = (category: Category): Action => ({
    type: CAT__CREATE,
    payload: category,
});
