import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '~/Redux/reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default  (initialState) => {
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store;
}
