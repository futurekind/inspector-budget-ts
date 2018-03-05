import reducer, { initialState } from '../transactions';
import * as actions from '../../actions/transactions';
import { State } from '../../types/transactions';

describe('Transactions Reducer', () => {
    let state: State;

    it('returns initial state', () => {
        // @ts-ignore
        state = reducer(undefined, {});
        expect(state).toEqual(initialState);
    });

    it(`handles ${actions.TA__CREATE}`, () => {
        const prevState = state;

        state = reducer(prevState, {
            type: actions.TA__CREATE,
            payload: {
                accountId: 'a1',
                categoryId: 'c1',
                cleared: false,
                createdAt: '',
                date: '',
                id: 'ta1',
                payeeId: '',
                text: '',
                updatedAt: '',
                volume: 123,
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: ['ta1'],
            entities: {
                ta1: {
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta1',
                    payeeId: '',
                    text: '',
                    updatedAt: '',
                    volume: 123,
                },
            },
        });
    });
});
