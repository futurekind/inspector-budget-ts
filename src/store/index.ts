import { createStore, combineReducers } from 'redux';
import accounts from '../reducers/accounts';

export default createStore(
    combineReducers({ accounts }),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
