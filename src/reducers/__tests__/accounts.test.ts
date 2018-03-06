import { State } from '../../types/account';
import { Transaction } from '../../types/transactions';
import reducer, { initialState } from '../accounts';
import * as actions from '../../actions/accounts';
import * as taActions from '../../actions/transactions';

describe('Accounts Reducer', () => {
    let state: State;

    it('returns initial state', () => {
        // @ts-ignore
        state = reducer(undefined, {});
        expect(state).toEqual(initialState);
    });

    it(`handles ${actions.ACCOUNT__CREATE} I`, () => {
        const prevState = state;
        state = reducer(state, {
            type: actions.ACCOUNT__CREATE,
            payload: {
                id: 'acc01',
                name: 'Account 1',
                balance: 0,
                createdAt: '2018-02-19T13:20:36.814Z',
                updatedAt: '2018-02-19T13:20:36.814Z',
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: ['acc01'],
            entities: {
                acc01: {
                    id: 'acc01',
                    name: 'Account 1',
                    balance: 0,
                    createdAt: '2018-02-19T13:20:36.814Z',
                    updatedAt: '2018-02-19T13:20:36.814Z',
                },
            },
        });
    });

    it(`handles ${actions.ACCOUNT__CREATE} II`, () => {
        const prevState = state;
        state = reducer(state, {
            type: actions.ACCOUNT__CREATE,
            payload: {
                id: 'acc02',
                name: 'Account 2',
                balance: 0,
                createdAt: '2018-02-20T13:20:36.814Z',
                updatedAt: '2018-02-20T13:20:36.814Z',
            },
        });

        expect(state).toEqual({
            ...prevState,
            results: [...prevState.results, 'acc02'],
            entities: {
                ...prevState.entities,
                acc02: {
                    id: 'acc02',
                    name: 'Account 2',
                    balance: 0,
                    createdAt: '2018-02-20T13:20:36.814Z',
                    updatedAt: '2018-02-20T13:20:36.814Z',
                },
            },
        });
    });

    it(`handles ${actions.ACCOUNT__UPDATE}`, () => {
        const prevState = state;
        state = reducer(state, {
            type: actions.ACCOUNT__UPDATE,
            payload: {
                id: 'acc02',
                name: 'Account 2a',
                balance: 10,
                createdAt: '2018-02-20T13:20:36.814Z',
                updatedAt: '2018-02-20T13:20:36.814Z',
            },
        });

        expect(state).toEqual({
            ...prevState,
            entities: {
                ...prevState.entities,
                acc02: {
                    ...prevState.entities.acc02,
                    name: 'Account 2a',
                    balance: 10,
                },
            },
        });
    });

    it(`handles ${taActions.TA__CREATE}`, () => {
        const ta: Transaction = {
            id: 'ta1',
            volume: 20,
            accountId: 'acc02',
            date: '',
            categoryId: '',
            cleared: false,
            createdAt: '',
            updatedAt: '',
        };

        const prevState = state;

        state = reducer(state, {
            type: taActions.TA__CREATE,
            payload: ta,
        });

        expect(state).toEqual({
            ...prevState,
            entities: {
                ...prevState.entities,
                acc02: {
                    ...prevState.entities.acc02,
                    balance: prevState.entities.acc02.balance + ta.volume,
                },
            },
        });
    });

    it(`handles ${taActions.TA__UPDATE}`, () => {
        const ta: Transaction = {
            id: 'ta1',
            volume: -20,
            accountId: 'acc02',
            date: '',
            categoryId: '',
            cleared: false,
            createdAt: '',
            updatedAt: '',
        };

        const prevState = state;

        state = reducer(state, {
            type: taActions.TA__UPDATE,
            payload: {
                transaction: ta,
                prevVolume: 20,
            },
        });

        expect(state).toEqual({
            ...prevState,
            entities: {
                ...prevState.entities,
                acc02: {
                    ...prevState.entities.acc02,
                    balance: prevState.entities.acc02.balance - 20 + ta.volume,
                },
            },
        });
    });

    it(`handles ${taActions.TA__DELETE}`, () => {
        const prevState = state;

        state = reducer(state, {
            type: taActions.TA__DELETE,
            payload: {
                id: 'ta1',
                volume: -20,
                accountId: 'acc02',
                date: '',
                categoryId: '',
                cleared: false,
                createdAt: '',
                updatedAt: '',
            },
        });

        expect(state).toEqual({
            ...prevState,
            entities: {
                ...prevState.entities,
                acc02: {
                    ...prevState.entities.acc02,
                    balance: prevState.entities.acc02.balance - -20,
                },
            },
        });
    });

    it(`handles ${actions.ACCOUNT__DELETE}`, () => {
        const prevState = state;

        state = reducer(prevState, {
            type: actions.ACCOUNT__DELETE,
            payload: 'acc01',
        });

        expect(state).toEqual({
            ...prevState,
            results: ['acc02'],
            entities: {
                acc02: prevState.entities.acc02,
            },
        });
    });
});
