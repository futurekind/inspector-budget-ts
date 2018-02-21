import { State } from '../types/account';
import * as actions from '../actions/accounts';

export const initialState: State = {
    results: [],
    entities: {},
};

export default (
    state: State = initialState,
    action?: actions.Action
): State => {
    if (!action) return state;

    const { type, payload } = action;

    switch (type) {
        case actions.ACCOUNT__CREATE:
            if (typeof payload === 'string') return state;

            return {
                ...state,
                results: [...state.results, payload.id],
                entities: {
                    ...state.entities,
                    [payload.id]: payload,
                },
            };

        case actions.ACCOUNT__UPDATE:
            if (typeof payload === 'string') return state;
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

        case actions.ACCOUNT__DELETE:
            if (typeof payload === 'object') return state;

            const index = state.results.indexOf(payload);

            return {
                ...state,
                results: [
                    ...state.results.slice(0, index),
                    ...state.results.slice(index + 1),
                ],
                entities: Object.keys(state.entities).reduce((acc, key) => {
                    if (key === payload) return acc;

                    return {
                        ...acc,
                        [key]: state.entities[key],
                    };
                }, {}),
            };

        default:
            return state;
    }
};
