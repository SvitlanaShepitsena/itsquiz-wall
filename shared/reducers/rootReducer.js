'use strict';

import { combineReducers } from 'redux';
import apiResponseFormatter from '../utils/apiResponseFormatter';
import user from './user';
import article from './article';

import {
    LOAD_ACTIVATIONS_SUCCESS,
    LOAD_ACTIVATION_REQUEST,
    LOAD_ACTIVATION_SUCCESS,
    LOAD_ACTIVATION_FAIL,
    CHANGE_ACTIVATIONS_CATEGORY
} from '../actions/activations';

function activations(state = {activations: [], isLoading: true}, action) {
    switch (action.type) {
        case LOAD_ACTIVATIONS_SUCCESS:
            return {
                activations: action.activations,
                isLoading: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    activations,
    user,
    article
});

export default rootReducer;
