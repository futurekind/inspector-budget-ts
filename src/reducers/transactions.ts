import { State, Transaction } from '../types/transactions';
import * as taActions from '../actions/transactions';

export const initialState: State = {
    results: [],
    entities: {},
};

export default (
    state: State = initialState,
    action: taActions.Action
): State => {
    const { type } = action;

    switch (type) {
        case taActions.TA__CREATE: {
            const payload = <Transaction>action.payload;

            return {
                ...state,
                results: [...state.results, payload.id],
                entities: {
                    ...state.entities,
                    [payload.id]: payload,
                },
            };
        }

        case taActions.TA__UPDATE: {
            const payload = <taActions.TransactionWithPrevVolume>action.payload;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [payload.transaction.id]: payload.transaction,
                },
            };
        }

        case taActions.TA__DELETE: {
            const payload = <taActions.TransactionIdWithVolumne>action.payload;
            const index = state.results.indexOf(payload.transactionId);

            return {
                ...state,
                results: [
                    ...state.results.slice(0, index),
                    ...state.results.slice(index + 1),
                ],
                entities: Object.keys(state.entities).reduce((acc, key) => {
                    if (key === payload.transactionId) return acc;

                    return {
                        ...acc,
                        [key]: state.entities[key],
                    };
                }, {}),
            };
        }

        default:
            return state;
    }
};
