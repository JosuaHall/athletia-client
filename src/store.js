import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: "persist-key",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "production"
      ? null
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

export default store;
export { persistor };
