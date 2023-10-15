import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/BookingSlice'

export const store = configureStore({
  reducer: {
    auth: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
