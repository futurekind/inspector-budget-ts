import * as selectors from '../accounts';

const state = {
    accounts: {
        results: ['acc1', 'acc2', 'acc3'],
        entities: {
            acc1: {
                id: 'acc1',
                name: 'Account Z',
                balance: 0,
                createdAt: '2018-02-20T13:20:36.814Z',
                updatedAt: '2018-02-20T13:20:36.814Z',
            },
            acc2: {
                id: 'acc2',
                name: 'Account A',
                balance: 50,
                createdAt: '2018-02-10T13:20:36.814Z',
                updatedAt: '2018-02-10T13:20:36.814Z',
            },
            acc3: {
                id: 'acc3',
                name: 'Account C',
                balance: 50,
                createdAt: '2018-02-15T13:20:36.814Z',
                updatedAt: '2018-02-15T13:20:36.814Z',
            },
        },
    },
};

describe('Accounts Selectors', () => {
    describe('getResults()', () => {
        it('returns state', () => {
            expect(selectors.getResults(state)).toEqual(state.accounts.results);
        });
    });
});
