import { Transaction } from '../types/transactions';

export const TA__CREATE = 'TA__CREATE';
export type TA__CREATE = typeof TA__CREATE;

export const TA__UPDATE = 'TA__UPDATE';
export type TA__UPDATE = typeof TA__UPDATE;

interface Action {
    type: TA__CREATE | TA__UPDATE;
    payload:
        | Transaction
        | {
              transaction: Transaction;
              prevVolume: number;
          };
}

export const create = (transaction: Transaction): Action => ({
    type: TA__CREATE,
    payload: transaction,
});

export const update = (
    transaction: Transaction,
    prevVolume: number
): Action => ({
    type: TA__UPDATE,
    payload: {
        transaction,
        prevVolume,
    },
});
