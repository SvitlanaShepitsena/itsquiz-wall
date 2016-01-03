'use strict';

import { combineReducers } from 'redux';
import apiResponseFormatter from '../utils/apiResponseFormatter';

import {
    LOAD_ACTIVATIONS_SUCCESS,
    LOAD_ACTIVATION_REQUEST,
    LOAD_ACTIVATION_SUCCESS,
    LOAD_ACTIVATION_FAIL,
    CHANGE_ACTIVATIONS_CATEGORY
} from '../actions/activations';

import {
    LOAD_USERS_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL
} from '../actions/users';

function activations(state = {activations: [], isLoading: true}, action) {
    switch (action.type) {
        case LOAD_ACTIVATIONS_SUCCESS:
            return {
                activations:action.activations,
                isLoading: false
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    activations
});

export default rootReducer;
