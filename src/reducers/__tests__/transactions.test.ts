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

        state = reducer(state, {
            type: actions.TA__CREATE,
            payload: {
                accountId: 'a1',
                categoryId: 'c1',
                cleared: false,
                createdAt: '',
                date: '',
                id: 'ta2',
                payeeId: '',
                text: '',
                updatedAt: '',
                volume: 15,
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: ['ta1', 'ta2'],
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
                ta2: {
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta2',
                    payeeId: '',
                    text: '',
                    updatedAt: '',
                    volume: 15,
                },
            },
        });
    });

    it(`handles ${actions.TA__UPDATE}`, () => {
        const prevState = state;

        state = reducer(prevState, {
            type: actions.TA__UPDATE,
            payload: {
                transaction: {
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta1',
                    payeeId: '',
                    text: 'Some text',
                    updatedAt: '',
                    volume: 12.3,
                },
                prevVolume: 123,
            },
        });

        expect(state).toEqual({
            ...prevState,
            entities: {
                ...prevState.entities,
                ta1: {
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta1',
                    payeeId: '',
                    text: 'Some text',
                    updatedAt: '',
                    volume: 12.3,
                },
            },
        });
    });

    it(`handles ${actions.TA__DELETE}`, () => {
        const prevState = state;

        state = reducer(prevState, {
            type: actions.TA__DELETE,
            payload: {
                accountId: 'a1',
                categoryId: 'c1',
                cleared: false,
                createdAt: '',
                date: '',
                id: 'ta1',
                payeeId: '',
                text: 'Some text',
                updatedAt: '',
                volume: 12.3,
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: ['ta2'],
            entities: {
                ta2: prevState.entities.ta2,
            },
        });
    });
});
