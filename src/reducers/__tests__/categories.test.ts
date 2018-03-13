import reducer, { initialState } from '../categories';
import * as actions from '../../actions/categories';
import { State } from '../../types/category';

describe('Categories Reducer', () => {
    let state: State;

    it('returns initial state', () => {
        // @ts-ignore
        state = expect(reducer(undefined, {})).toEqual(initialState);
    });

    it(`handles ${actions.CAT__CREATE}`, () => {
        const prevState = state;

        state = reducer(prevState, {
            type: actions.CAT__CREATE,
            payload: {
                id: 'some',
                label: 'Some Label',
                parent: null,
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: ['some'],
            entities: {
                some: {
                    id: 'some',
                    label: 'Some Label',
                    parent: null,
                },
            },
        });
    });
});
