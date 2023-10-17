import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { RootState } from '../store'
import { AxiosError } from 'axios'

export interface IBooking {
  full_name: string
  phone_number: string
  event_start: string
  event_end: string
  technical_equipment: string
  organizer_info: string
  role: number
  place: number
}

interface IBookingState {
  loading: boolean
  error: any | null
  booking: IBooking
}

const initialState: IBookingState = {
  loading: false,
  error: null,
  booking: {
    full_name: '',
    phone_number: '',
    event_start: '',
    event_end: '',
    technical_equipment: '',
    organizer_info: '',
    role: 0,
    place: 0,
  },
}

export const createBooking = createAsyncThunk<
  any,
  IBooking,
  { rejectValue: AxiosError }
>('createBooking', async function (iBooking, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.post('bookings/create', {
      iBooking,
    })
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
})

export const selectIsLoading = (state: RootState) => state.booking.loading
export const selectBooking = (state: RootState) => state.booking.booking
export const selectError = (state: RootState) => state.booking.error

export default BookingSlice.reducer
