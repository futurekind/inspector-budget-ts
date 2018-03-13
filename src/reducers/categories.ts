import * as categoryTypes from '../types/category';
import * as actions from '../actions/categories';

export const initialState: categoryTypes.State = {
    results: [],
    entities: {},
};

export default (
    state: categoryTypes.State = initialState,
    action: actions.Action
): categoryTypes.State => {
    switch (action.type) {
        case actions.CAT__CREATE: {
            const payload = <categoryTypes.Category>action.payload;

            return {
                ...state,
                results: [...state.results, payload.id],
                entities: {
                    ...state.entities,
                    [payload.id]: payload,
                },
            };
        }

        default:
            return state;
    }
};
