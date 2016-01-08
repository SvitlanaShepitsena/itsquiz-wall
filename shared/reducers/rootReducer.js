'use strict';

import { combineReducers } from 'redux';
import apiResponseFormatter from '../utils/apiResponseFormatter';
import user from './user';
import article from './article';

const rootReducer = combineReducers({
    article,
    user
});

export default rootReducer;
