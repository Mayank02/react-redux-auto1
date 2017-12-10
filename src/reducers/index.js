import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import merchants from './merchantsReducer';
import loading from './loadingReducer';

const rootReducer = combineReducers({
    merchants,
    loading,
    form: formReducer
});

export default rootReducer;