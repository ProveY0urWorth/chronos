import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  getPlaces,
  selectError,
  selectIsLoading,
  selectPlaces,
} from '../../redux/features/PlacesSlice'
import { Button, CircularProgress, Stack } from '@mui/material'
import { PlaceDataField } from '../../components/PlacesDataField'
import { routes } from '../../routing/config'
import { Link } from 'react-router-dom'
import { fetchBookingForPlace } from '../../redux/features/BookingInfoSlice'

interface HomePageProps {
  className?: string
}

interface PlaceInList {
  label: string
  value: number
}

export const HomePage: React.FC<HomePageProps> = ({ className = '' }) => {
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const places = useAppSelector(selectPlaces)
  const dispatch = useAppDispatch()

  const small_places: { label: string; value: number }[] = []

  useEffect(() => {
    dispatch(getPlaces())
    dispatch(
      fetchBookingForPlace({
        placeId: 1,
        date: '2023-10-12',
      })
    )
  }, [dispatch])

  if (isError) {
    return <></>
  }

  if (isLoading) {
    return <CircularProgress color='inherit' />
  }

  places.forEach((element) => {
    small_places.push({ label: element.name, value: element.unique_id })
  })

  const id = 1
  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(e: any) => {
            console.log(e.$y + '-' + (e.$M + 1) + '-' + e.$D)
          }}
        />
      </LocalizationProvider>
      <PlaceDataField
        places={small_places}
        placeId={null}
        mode={true}
      />
      <Link
        to={`${routes.booking}`}
        state={{
          placeId: id,
          date: '2023-10-12',
        }}
      >
        <Button>ЗАЯВОЧКА</Button>
      </Link>
    </Stack>
  )
}
