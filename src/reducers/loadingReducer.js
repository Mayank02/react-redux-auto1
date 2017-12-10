import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function loadingReducer(state = initialState.loading, action) {
    if (action.type === types.LOADING) {
        return action.status
    }
    return state;
}