import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { getMerchants } from './actions/merchantActions';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const store = configureStore();

store.dispatch(getMerchants());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
