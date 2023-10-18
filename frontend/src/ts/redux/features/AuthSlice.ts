import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { RootState } from '../store'
import { AxiosError } from 'axios'

export interface ILogin {
  login: string
  password: string
}

interface IAuthState {
  loading: boolean
  error: any | null
  success: boolean
  login: ILogin
}

const initialState: IAuthState = {
  loading: false,
  error: null,
  login: {
    login: '',
    password: '',
  },
  success: false,
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
  reducers: {
    logOut: () => {
      localStorage.clear()

      return {
        ...initialState,
        isInitialised: true,
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(LoginAttempt.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(LoginAttempt.fulfilled, (state, action) => {
        localStorage.setItem('isAdmin', 'true')
        return {
          ...state,
          loading: false,
          error: null,
          success: true,
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

export const { logOut } = LoginSlice.actions

export const selectIsLoading = (state: RootState) => state.login.loading
export const selectSuccess = (state: RootState) => state.login.success
export const selectError = (state: RootState) => state.login.error

export default LoginSlice.reducer
