import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer  from './user/userSlice.js'
// import { combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const rootReducer=combineReducers({
  user:useReducer
})

const persistConfig={
  key:'root',
  storage,
  version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  // reducer: {user: useReducer},
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
}),
})
 
export const persistor=persistStore(store)