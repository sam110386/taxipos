import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import authSaga from "./sagas/authSaga";
import carSaga from "./sagas/carSaga";
import tripSage from "./sagas/tripSage"
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  carReducer,
  globalReducer,
  userReducer,
  TripReducer,
  SetNumberReducer
} from "./reducers";

const rootPersistConfig = {
  key: "taxitech",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carReducer,
  global: globalReducer,
  user: userReducer,
  trip:TripReducer,
  number:SetNumberReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);
sagaMiddleware.run(carSaga);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(tripSage);

