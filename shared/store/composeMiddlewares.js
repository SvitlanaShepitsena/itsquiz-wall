import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default () => {

    const universalMiddleware = [thunk];

    if (process.browser) {
        /* Client Side*/
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
            /* Production */
            console.log('d');

        } else {
            /* Development */
            console.log('dev');
            // const chromeDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
            // universalMiddleware.push(chromeDevTools);

        }
    }
    return universalMiddleware;
};
