import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/BookingSlice'
import placesReducer from './features/PlacesSlice'

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    places: placesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
