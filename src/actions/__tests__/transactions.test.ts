import * as actions from '../transactions';

describe('Transactions Actions', () => {
    describe('create()', () => {
        it('returns action', () => {
            expect(
                actions.create({
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta1',
                    updatedAt: '',
                    volume: 1.23,
                })
            ).toEqual({
                type: actions.TA__CREATE,
                payload: {
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '',
                    id: 'ta1',
                    updatedAt: '',
                    volume: 1.23,
                },
            });
        });
    });

    describe('update()', () => {
        it('returns action', () => {
            expect(
                actions.update(
                    {
                        accountId: 'a1',
                        categoryId: 'c1',
                        cleared: false,
                        createdAt: '',
                        date: '',
                        id: 'ta1',
                        updatedAt: '',
                        volume: 1.23,
                    },
                    0.12
                )
            ).toEqual({
                type: actions.TA__UPDATE,
                payload: {
                    transaction: {
                        accountId: 'a1',
                        categoryId: 'c1',
                        cleared: false,
                        createdAt: '',
                        date: '',
                        id: 'ta1',
                        updatedAt: '',
                        volume: 1.23,
                    },
                    prevVolume: 0.12,
                },
            });
        });
    });
});
