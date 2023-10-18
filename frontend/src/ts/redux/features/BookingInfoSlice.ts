import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { AxiosError } from 'axios'
import { RootState } from '../store'
import { IBooking } from './BookingSlice'

export interface IBookingInfo extends IBooking {
  unique_id: number
}

export interface IBookingAdminInfo extends IBookingInfo {
  is_approved: boolean
}

interface FecthBookingParams {
  placeId: number
  date: string
}

interface getBookingByIdParams {
  id: number
}

export const getBookingById = createAsyncThunk<
  IBookingInfo,
  getBookingByIdParams,
  { rejectValue: AxiosError }
>('getBookingById', async function (getBookingByIdParams, { rejectWithValue }) {
  try {
    const { id } = getBookingByIdParams
    const { data } = await axiosInstance.get(`admin/bookings/${id}/`)
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const fetchBookingForPlace = createAsyncThunk<
  IBookingAdminInfo[],
  FecthBookingParams,
  { rejectValue: AxiosError }
>(
  'fetchBookingsForPlace',
  async function (fecthBookingParams, { rejectWithValue }) {
    try {
      const isAdmin = localStorage.getItem('isAdmin')
      const { placeId = 0, date = '' } = fecthBookingParams
      const { data } = await axiosInstance.get(
        isAdmin == 'true'
          ? `admin/bookings/${placeId}/${date}/?format=json`
          : `bookings/${placeId}/${date}/?format=json`
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
  bookings: IBookingAdminInfo[]
  booking: IBooking | null
}

const initialState: IBookingsInfoState = {
  loading: false,
  error: null,
  bookings: [],
  booking: null,
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
          error: action.payload,
        }
      })
      .addCase(getBookingById.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        const result = action.payload
        return {
          ...state,
          loading: false,
          booking: result,
          error: null,
        }
      })
      .addCase(getBookingById.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }),
})

export const selectIsLoading = (state: RootState) => state.bookingsInfo.loading
export const selectBookingsInfo = (state: RootState) =>
  state.bookingsInfo.bookings
export const selectBookingInfo = (state: RootState) =>
  state.bookingsInfo.booking
export const selectError = (state: RootState) => state.bookingsInfo.error

export default BookingsInfoSlice.reducer
