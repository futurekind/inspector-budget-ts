import * as actions from '../accounts';

describe('Accounts Actions', () => {
    describe('create()', () => {
        it('returns action', () => {
            expect(
                actions.create({
                    id: 'some-id',
                    name: 'some name',
                    balance: 0.123,
                    createdAt: 'some-date',
                    updatedAt: 'some-date',
                })
            ).toEqual({
                type: actions.ACCOUNT__CREATE,
                payload: {
                    id: 'some-id',
                    name: 'some name',
                    balance: 0.123,
                    createdAt: 'some-date',
                    updatedAt: 'some-date',
                },
            });
        });
    });

    describe('update()', () => {
        it('returns action', () => {
            expect(
                actions.update({
                    id: 'some-id',
                    name: 'some name 2',
                    balance: 1.123,
                    createdAt: 'some-date',
                    updatedAt: 'some-date',
                })
            ).toEqual({
                type: actions.ACCOUNT__UPDATE,
                payload: {
                    id: 'some-id',
                    name: 'some name 2',
                    balance: 1.123,
                    createdAt: 'some-date',
                    updatedAt: 'some-date',
                },
            });
        });
    });

    describe('remove()', () => {
        expect(actions.remove('some-id')).toEqual({
            type: actions.ACCOUNT__DELETE,
            payload: 'some-id',
        });
    });
});
