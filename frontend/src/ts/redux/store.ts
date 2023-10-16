import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/BookingSlice'
import placesReducer from './features/PlacesSlice'
import bookingsInfoReducer from './features/BookingInfoSlice'

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    places: placesReducer,
    bookingsInfo: bookingsInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
