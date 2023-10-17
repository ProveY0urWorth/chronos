import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect } from 'react'
import styles from './AdminHomePage.module.scss'
import classNames from 'classnames/bind'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  getPlaces,
  selectError,
  selectIsLoading,
  selectPlaces,
} from '../../redux/features/PlacesSlice'
import { Button, CircularProgress, Stack } from '@mui/material'
import { PlaceDataField } from '../../components/PlacesDataField/PlacesDataField'
import { routes } from '../../routing/config'
import { Link } from 'react-router-dom'
import {
  fetchBookingForPlace,
  selectBookingsInfo,
} from '../../redux/features/BookingInfoSlice'
import dayjs, { Dayjs } from 'dayjs'
import { Form, Formik } from 'formik'

const cx = classNames.bind(styles)

interface AdminHomePageProps {
  className?: string
}

interface IHome {
  placeId: number
  date: string
}

export const AdminHomePage: React.FC<AdminHomePageProps> = ({
  className = '',
}) => {
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const places = useAppSelector(selectPlaces)
  const bookings = useAppSelector(selectBookingsInfo)
  const dispatch = useAppDispatch()

  const placesList: { label: string; value: number }[] = []

  const Initial_Values: IHome = {
    placeId: 0,
    date: '',
  }

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
    placesList.push({ label: element.name, value: element.unique_id })
  })

  const shouldDisableDate = (date: Dayjs) => {
    //const dateInterditesRaw = [
    //  dayjs('2023-10-1'),
    //  dayjs('2023-10-2'),
    //  dayjs('2023-10-8'),
    //  dayjs('2023-10-9'),
    //  dayjs('2023-10-14'),
    //  dayjs('2023-10-17'),
    //  dayjs('2023-10-18'),
    //  dayjs('2023-10-25'),
    //]
    //
    //// Create an array of getTime values from dateInterditesRaw
    //const dateInterdites = dateInterditesRaw.map((forbiddenDate) =>
    //  forbiddenDate.unix()
    //)

    // Check if the date.unix() value is in the dateInterdites array
    return date.day() === 0 //|| dateInterdites.includes(date.unix())
  }

  return (
    <Formik
      initialValues={Initial_Values}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ values, submitForm }) => {
        return (
          <Form>
            <Stack direction={'row'}>
              Admin
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <PlaceDataField
                  places={placesList}
                  placeId={values.placeId}
                />
                <DateCalendar
                  disablePast
                  shouldDisableDate={shouldDisableDate}
                  onChange={(e: any) => {
                    values.date = e.$y + '-' + (e.$M + 1) + '-' + e.$D
                    dispatch(
                      fetchBookingForPlace({
                        placeId: values.placeId,
                        date: values.date,
                      })
                    )
                    console.log(bookings)
                  }}
                />
              </LocalizationProvider>
              <Link
                to={`${routes.adminBooking}`}
                state={{
                  placeId: values.placeId,
                  date: values.date,
                }}
              >
                <Button onClick={submitForm}>ЗАЯВОЧКА</Button>
              </Link>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}
