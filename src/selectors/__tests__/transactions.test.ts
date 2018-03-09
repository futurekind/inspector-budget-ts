import * as selectors from '../transactions';
import { State } from '../../types/transactions'

const state: {
    transactions: State
} = {
        transactions: {
            results: ['t1', 't2', 't3'],
            entities: {
                t1: {
                    id: 't1',
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '2018-02-16',
                    updatedAt: '',
                    volume: 10.5
                },
                t2: {
                    id: 't2',
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '2018-02-10',
                    updatedAt: '',
                    volume: 10.5
                },
                t3: {
                    id: 't3',
                    accountId: 'a1',
                    categoryId: 'c1',
                    cleared: false,
                    createdAt: '',
                    date: '2018-02-11',
                    updatedAt: '',
                    volume: 10.5
                }
            }
        }
    }

describe('Transactions Selectors', () => {

    describe('getEntities()', () => {
        it('returns state', () => {
            // @ts-ignore
            expect(selectors.getEntities(state)).toEqual(state.transactions.entities)
        })
    })

    describe('getResults()', () => {
        it('returns state', () => {
            // @ts-ignore
            expect(selectors.getResults(state)).toEqual(state.transactions.results)
        })
    })

    describe('makeSortedResults()', () => {
        it('returns state', () => {
            // @ts-ignore
            const sortedResults = selectors.makeGetSortedResults(state)
            expect(sortedResults('date')).toEqual(['t2', 't3', 't1'])
        })
    })

})
