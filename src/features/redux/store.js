import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userStote';
import storage from 'redux-persist/lib/storage'
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['accessToken']
}

const rootReducer = {
  user: persistReducer(persistConfig, userReducer)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export default store
export const persistor = persistStore(store)