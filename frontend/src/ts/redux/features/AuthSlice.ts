import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { RootState } from '../store'
import { AxiosError } from 'axios'

export interface ILogin {
  login: string
  password: string
}

interface IBookingState {
  loading: boolean
  error: any | null
  login: ILogin
}

const initialState: IBookingState = {
  loading: false,
  error: null,
  login: {
    login: '',
    password: '',
  },
}

export const LoginAttempt = createAsyncThunk<
  any,
  ILogin,
  { rejectValue: AxiosError }
>('createBooking', async function (iLogin, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.post('login/', {
      login: iLogin.login,
      password: iLogin.password,
    })
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(LoginAttempt.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(LoginAttempt.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
        }
      })
      .addCase(LoginAttempt.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }),
})

export const selectIsLoading = (state: RootState) => state.login.loading
//export const selectBooking = (state: RootState) => state.login.booking
export const selectError = (state: RootState) => state.login.error

export default LoginSlice.reducer
