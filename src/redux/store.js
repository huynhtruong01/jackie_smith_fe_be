import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../features/Cart/cartSlice'
import userReducer from '../features/Auth/userSlice'
import userTemporaryReducer from '../features/Auth/userTemporarySlice'
import checkoutReducer from '../features/Checkout/checkoutSlice'
import toggleReducer from './toggleSlice'
import trackingOrderReducer from '../features/TrackingOrder/trackingOrderSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user2: userReducer,
    userTemporary: userTemporaryReducer,
    checkout: checkoutReducer,
    trackingOrder: trackingOrderReducer,
    toggle: toggleReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
