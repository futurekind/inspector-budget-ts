import { State } from '../types/account';
import { Transaction } from '../types/transactions';
import * as actions from '../actions/accounts';
import * as taActions from '../actions/transactions';

export const initialState: State = {
    results: [],
    entities: {},
};

export default (
    state: State = initialState,
    action: actions.Action | taActions.Action
): State => {
    switch (action.type) {
        case actions.ACCOUNT__CREATE: {
            const { payload } = action as actions.Action;

            if (typeof payload === 'string') {
                return state;
            }

            return {
                ...state,
                results: [...state.results, payload.id],
                entities: {
                    ...state.entities,
                    [payload.id]: payload,
                },
            };
        }

        case actions.ACCOUNT__UPDATE: {
            const { payload } = action as actions.Action;

            if (typeof payload === 'string') {
                return state;
            }
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [payload.id]: {
                        ...state.entities[payload.id],
                        ...payload,
                    },
                },
            };
        }

        case actions.ACCOUNT__DELETE: {
            const { payload } = action as actions.Action;

            if (typeof payload === 'object') {
                return state;
            }

            const index = state.results.indexOf(payload);

            return {
                ...state,
                results: [
                    ...state.results.slice(0, index),
                    ...state.results.slice(index + 1),
                ],
                entities: Object.keys(state.entities).reduce((acc, key) => {
                    if (key === payload) {
                        return acc;
                    }

                    return {
                        ...acc,
                        [key]: state.entities[key],
                    };
                }, {}),
            };
        }

        case taActions.TA__CREATE: {
            const { payload } = action as taActions.Action;
            const ta = payload as Transaction;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [ta.accountId]: {
                        ...state.entities[ta.accountId],
                        balance:
                            state.entities[ta.accountId].balance + ta.volume,
                    },
                },
            };
        }

        case taActions.TA__UPDATE: {
            const { payload } = action as taActions.Action;
            const {
                transaction,
                prevVolume,
            } = payload as taActions.TransactionWithPrevVolume;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [transaction.accountId]: {
                        ...state.entities[transaction.accountId],
                        balance:
                            state.entities[transaction.accountId].balance -
                            prevVolume +
                            transaction.volume,
                    },
                },
            };
        }

        case taActions.TA__DELETE: {
            const { payload } = action as taActions.Action;
            const transaction = payload as Transaction;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [transaction.accountId]: {
                        ...state.entities[transaction.accountId],
                        balance:
                            state.entities[transaction.accountId].balance -
                            transaction.volume,
                    },
                },
            };
        }

        default:
            return state;
    }
};
