import {configureStore} from '@reduxjs/toolkit'
import mapReducer, { authReducer } from './reducer'

export const store = configureStore({
    reducer:{
        mapReducer: mapReducer,
        authReducer: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})