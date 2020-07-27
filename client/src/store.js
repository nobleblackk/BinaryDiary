import { createStore, applyMiddleware, compose } from "redux";

// redux-thunk as middleware.this middleware will help us, whenever we make any ajax request, then it will wait, then after receiving the response, it will dispatch.
import thunk from "redux-thunk";

// as our rootReducer is named as index.js, so we need not to specify that, it will import from the repository reducers index.js only, when no name mentioned. Just a Clever Way for less coding :P.
import rootReducer from "./reducers";

// Initial State for our createStore
const initialState = {};

const middleware = [thunk];

// We are initializing our Application Store which will holds all our data(states). To create store, we use createStore() function, which demands 3 arguments, 1. Reducer function that returns the next state tree, given the current state and an action to handle. 2. Preloaded State, if any. 3. Middleware(the store  enhancer). you may optionally specify it to enhance the store with third party capabilities such as middleware.
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
