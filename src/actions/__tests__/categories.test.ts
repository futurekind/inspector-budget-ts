import * as actions from '../categories';

describe('Categories Actions', () => {
    describe('create()', () => {
        it('returns action', () => {
            expect(
                actions.create({
                    id: 'some',
                    label: 'My Category',
                    parent: null,
                })
            ).toEqual({
                type: actions.CAT__CREATE,
                payload: {
                    id: 'some',
                    label: 'My Category',
                    parent: null,
                },
            });
        });
    });

    describe('update()', () => {
        it('returns action', () => {
            expect(
                actions.update({
                    id: 'some',
                    label: 'My Category 2',
                    parent: 'foo',
                })
            ).toEqual({
                type: actions.CAT__UPDATE,
                payload: {
                    id: 'some',
                    label: 'My Category 2',
                    parent: 'foo',
                },
            });
        });
    });

    describe('remove()', () => {
        it('returns action', () => {
            expect(actions.remove('some-id')).toEqual({
                type: actions.CAT__DELETE,
                payload: 'some-id',
            });
        });
    });
});
