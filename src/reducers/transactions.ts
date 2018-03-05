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

        default:
            return state;
    }
};
