import { combineReducers } from 'redux';

const initState = null;

const checkoutReducer = function (state = initState, { type, payload }) {
    switch (type) {
        case 'CHECKOUT_REQUEST':
            return { ...payload, };
        default:
            return state;
    }
}

export default combineReducers({
    checkout: checkoutReducer
})


