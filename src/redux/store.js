import {configureStore} from '@reduxjs/toolkit'
import { BillReducer } from './billReducer'
import mapReducer, { authReducer } from './reducer'

export const store = configureStore({
    reducer:{
        mapReducer: mapReducer,
        authReducer: authReducer,
        billReducer: BillReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})