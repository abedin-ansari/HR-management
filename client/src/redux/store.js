// import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import rootReducer from './rootReducer';

// const store = createStore(rootReducer, applyMiddleware(logger));

// export default store;

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Change this line to use named import
import logger from "redux-logger";
import rootReducer from "./rootReducer";

// Create a store with thunk and logger middleware
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
