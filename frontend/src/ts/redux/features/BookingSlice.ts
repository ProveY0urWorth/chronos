import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { RootState } from '../store'
import { AxiosError } from 'axios'
import { IBookingAdminInfo } from './BookingInfoSlice'

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

interface IBookingId {
  id: number
}

interface IBookingState {
  loading: boolean
  error: any | null
  success: boolean
  booking: IBookingAdminInfo
}

const initialState: IBookingState = {
  loading: false,
  error: null,
  success: false,
  booking: {
    full_name: '',
    phone_number: '',
    event_start: '',
    event_end: '',
    technical_equipment: '',
    organizer_info: '',
    role: 0,
    place: 0,
    is_approved: false,
    unique_id: 0,
  },
}

export const createBooking = createAsyncThunk<
  any,
  IBooking,
  { rejectValue: AxiosError }
>('createBooking', async function (iBooking, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.post('bookings/create', {
      full_name: iBooking.full_name,
      phone_number: iBooking.phone_number,
      event_start: iBooking.event_start,
      event_end: iBooking.event_end,
      organizer_info: iBooking.organizer_info,
      technical_equipment: iBooking.technical_equipment,
      place: iBooking.place,
      role: iBooking.role,
    })
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const editBooking = createAsyncThunk<
  any,
  IBookingAdminInfo,
  { rejectValue: AxiosError }
>('editBooking', async function (IBookingAdminInfo, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.put(
      `admin/bookings/${IBookingAdminInfo.unique_id}/`,
      {
        full_name: IBookingAdminInfo.full_name,
        phone_number: IBookingAdminInfo.phone_number,
        event_start: IBookingAdminInfo.event_start,
        event_end: IBookingAdminInfo.event_end,
        organizer_info: IBookingAdminInfo.organizer_info,
        technical_equipment: IBookingAdminInfo.technical_equipment,
        place: IBookingAdminInfo.place,
        role: IBookingAdminInfo.role,
        is_approved: IBookingAdminInfo.is_approved,
      }
    )
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const deleteBooking = createAsyncThunk<
  any,
  IBookingId,
  { rejectValue: AxiosError }
>('deleteBooking', async function (IBookingId, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.delete(
      `admin/bookings/${IBookingId.id}/`
    )
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createBooking.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(createBooking.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          success: true,
          error: null,
        }
      })
      .addCase(createBooking.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(editBooking.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(editBooking.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          success: true,
          error: null,
        }
      })
      .addCase(editBooking.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(deleteBooking.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(deleteBooking.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          success: true,
          error: null,
        }
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }),
})

export const selectIsLoading = (state: RootState) => state.booking.loading
export const selectSuccess = (state: RootState) => state.booking.success
export const selectError = (state: RootState) => state.booking.error

export default BookingSlice.reducer
