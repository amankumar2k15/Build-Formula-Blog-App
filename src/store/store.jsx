import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';


const rootReducer = combineReducers({
    auth: persistReducer({ key: 'auth', storage }, authReducer),
    blog: blogReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: {
        root: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export const persistor = persistStore(store);

export default store;
