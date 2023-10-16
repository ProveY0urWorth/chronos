import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect } from 'react'
import styles from './HomePage.module.scss'
import classNames from 'classnames/bind'
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
import dayjs, { Dayjs } from 'dayjs'

const cx = classNames.bind(styles)

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

  const shouldDisableDate = (date: Dayjs) => {
    const dateInterditesRaw = [
      dayjs('2023-10-1'),
      dayjs('2023-10-2'),
      dayjs('2023-10-8'),
      dayjs('2023-10-9'),
      dayjs('2023-10-14'),
      dayjs('2023-10-17'),
      dayjs('2023-10-18'),
      dayjs('2023-10-25'),
    ]

    // Create an array of getTime values from dateInterditesRaw
    const dateInterdites = dateInterditesRaw.map((forbiddenDate) =>
      forbiddenDate.unix()
    )

    // Check if the date.unix() value is in the dateInterdites array
    return date.day() === 0 || dateInterdites.includes(date.unix())
  }

  const id = 1
  return (
    <Stack direction={'row'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PlaceDataField
          places={small_places}
          placeId={null}
          mode={true}
        />
        <DateCalendar
          disablePast
          shouldDisableDate={shouldDisableDate}
          onChange={(e: any) => {
            console.log(e.$y + '-' + (e.$M + 1) + '-' + e.$D)
          }}
        />
      </LocalizationProvider>
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
