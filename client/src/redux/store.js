import {legacy_createStore as createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import  storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['auth'], // In this example, we persist the 'user' reducer
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;

