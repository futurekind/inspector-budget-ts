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
});
