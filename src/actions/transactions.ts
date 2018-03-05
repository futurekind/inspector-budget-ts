import { Transaction } from '../types/transactions';

export const TA__CREATE = 'TA__CREATE';
export type TA__CREATE = typeof TA__CREATE;

interface Action {
    type: TA__CREATE;
    payload: Transaction;
}

export const create = (transaction: Transaction): Action => ({
    type: TA__CREATE,
    payload: transaction,
});
