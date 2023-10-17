import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { AxiosError } from 'axios'
import { RootState } from '../store'
import { IBooking } from './BookingSlice'

export interface IBookingInfo extends IBooking {
  unique_id: number
}

interface IBookingInfoResponse {
  list: IBooking[]
}

interface FecthBookingParams {
  placeId: number
  date: string
}

export const fetchBookingForPlace = createAsyncThunk<
  IBookingInfo[],
  FecthBookingParams,
  { rejectValue: AxiosError }
>(
  'fetchBookingsForPlace',
  async function (fecthBookingParams, { rejectWithValue }) {
    try {
      const { placeId = 0, date = '' } = fecthBookingParams
      const { data } = await axiosInstance.get(
        `bookings/${placeId}/${date}/?format=json`
      )
      return data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

interface IBookingsInfoState {
  loading: boolean
  error: any | null
  bookings: IBookingInfo[]
}

const initialState: IBookingsInfoState = {
  loading: false,
  error: null,
  bookings: [],
}

export const BookingsInfoSlice = createSlice({
  name: 'boookingInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBookingForPlace.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(fetchBookingForPlace.fulfilled, (state, action) => {
        const result = action.payload
        return {
          ...state,
          loading: false,
          bookings: result,
          error: null,
        }
      })
      .addCase(fetchBookingForPlace.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          services: [],
          error: action.payload,
        }
      }),
})

export const selectIsLoading = (state: RootState) => state.bookingsInfo.loading
export const selectBookingsInfo = (state: RootState) =>
  state.bookingsInfo.bookings
export const selectError = (state: RootState) => state.bookingsInfo.error

export default BookingsInfoSlice.reducer
