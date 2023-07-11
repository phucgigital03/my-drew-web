import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';

import userReducer from './userStote';
import cartReducer from './cartStote';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user','cart']
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['accessToken']
}

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartId']
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  cart: persistReducer(cartPersistConfig,cartReducer)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH, REHYDRATE, 
        PAUSE, PERSIST, 
        PURGE, REGISTER,
        'cart/addToCart/rejected',
        'cart/addToCart/fulfilled',
        'cart/updatePlus/rejected',
        'cart/updatePlus/fulfilled',
        'cart/updateMinus/rejected',
        'cart/updateMinus/fulfilled',
        'cart/deleProduct/rejected',
        'cart/deleProduct/fulfilled',
      ],
    },
  }),
})

export default store
export const persistor = persistStore(store)