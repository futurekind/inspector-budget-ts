import { Account } from '../types/account';

export const ACCOUNT__CREATE = 'ACCOUNT__CREATE';
export type ACCOUNT__CREATE = typeof ACCOUNT__CREATE;

export const ACCOUNT__UPDATE = 'ACCOUNT__UPDATE';
export type ACCOUNT__UPDATE = typeof ACCOUNT__UPDATE;

export const ACCOUNT__DELETE = 'ACCOUNT__DELETE';
export type ACCOUNT__DELETE = typeof ACCOUNT__DELETE;

export interface Action {
    type: ACCOUNT__CREATE | ACCOUNT__UPDATE | ACCOUNT__DELETE;
    payload: Account | string;
}

export const create = (account: Account): Action => ({
    type: ACCOUNT__CREATE,
    payload: account,
});

export const update = (account: Account): Action => ({
    type: ACCOUNT__UPDATE,
    payload: account,
});

export const remove = (id: string): Action => ({
    type: ACCOUNT__DELETE,
    payload: id,
});
