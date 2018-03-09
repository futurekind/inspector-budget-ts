import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import './index.css';

import App from './components/App';

store.dispatch({
    type: 'ACCOUNT__CREATE',
    payload: {
        id: 'acc1',
        name: 'Sparkasse',
        balance: 123.45,
        createdAt: '',
        updatedAt: '',
    },
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
