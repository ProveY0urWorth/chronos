import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { RootState } from '../store'

export interface IBooking {
  fullname: string
  phoneNumber: string
  eventStart: string
  eventFinish: string
  technicalEquipment: string
  organizerInfo: string
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
    fullname: '',
    phoneNumber: '',
    eventStart: '',
    eventFinish: '',
    technicalEquipment: '',
    organizerInfo: '',
    role: 0,
    place: 0,
  },
}

export const BookingSlice = createSlice({
  name: 'adminCredentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
})

export default BookingSlice.reducer
