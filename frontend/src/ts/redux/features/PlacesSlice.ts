import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../constants/axios'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../store'

export interface IPlace {
  unique_id: number
  name: string
  description: string
  building: string
}

interface IPlaceResponse {
  places: IPlace[]
}

export const fetchPlaces = createAsyncThunk<
  IPlace[],
  undefined,
  {
    rejectValue: AxiosError
  }
>('getPlaces', async function (_, { rejectWithValue }) {
  try {
    const { data } = await axiosInstance.get('/places/list/?format=json')
    return data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

interface IPlacesState {
  loading: boolean
  error: any | null
  places: IPlace[]
}

const initialState: IPlacesState = {
  loading: false,
  error: null,
  places: [],
}

export const PlacesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPlaces.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        const result = action.payload
        return {
          ...state,
          loading: false,
          places: result,
          error: null,
        }
      })

      .addCase(fetchPlaces.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          services: [],
          error: action.payload,
        }
      }),
})

export const selectIsLoading = (state: RootState) => state.places.loading
export const selectPlaces = (state: RootState) => state.places.places
export const selectError = (state: RootState) => state.places.error

export default PlacesSlice.reducer
