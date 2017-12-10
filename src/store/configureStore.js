import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import initialState from './initialState';

const configureStore = () => {
    return createStore(
        reducers,
        initialState,
        process.env.NODE_ENV !== 'production' && window.devToolsExtension ?
            compose(applyMiddleware(thunk), window.devToolsExtension())
            :
            applyMiddleware(thunk)
    );
};

export default configureStore;
