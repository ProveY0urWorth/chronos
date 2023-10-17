import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/BookingSlice'
import placesReducer from './features/PlacesSlice'
import bookingsInfoReducer from './features/BookingInfoSlice'
import loginReducer from './features/AuthSlice'

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    places: placesReducer,
    bookingsInfo: bookingsInfoReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
