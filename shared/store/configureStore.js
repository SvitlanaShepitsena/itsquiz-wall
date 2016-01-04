import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
