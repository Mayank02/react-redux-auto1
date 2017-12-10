import axios from 'axios';
import * as types from './actionTypes';

export function addMerchant(merchant) {
    return { type: types.ADD_MERCHANT, merchant};
}

export function editMerchant(merchant) {
    return { type: types.EDIT_MERCHANT, merchant};
}

export function deleteMerchant(id) {
    return { type: types.DELETE_MERCHANT, id};
}

export function setMerchants(merchants) {
    return { type: types.SET_MERCHANTS, merchants};
}

export function loading(status) {
    return { type: types.LOADING, status};
}

export function getMerchants() {
    return dispatch => {
        dispatch(loading(true));
        axios.get('http://www.mocky.io/v2/5a2c4df12f0000cb1b03937f')
            .then(response => {
                dispatch(setMerchants(response.data));
                dispatch(loading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(loading(false));
            });
    };
}