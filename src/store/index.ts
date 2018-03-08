import { createStore, combineReducers } from 'redux';
import accounts from '../reducers/accounts';
import transactions from '../reducers/transactions';

export default createStore(
    combineReducers({ accounts, transactions }),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
