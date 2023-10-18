import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
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
import { PlaceDataField } from '../../components/PlacesDataField/PlacesDataField'
import { routes } from '../../routing/config'
import { Link } from 'react-router-dom'
import {
  fetchBookingForPlace,
  selectBookingsInfo,
} from '../../redux/features/BookingInfoSlice'
import { Dayjs } from 'dayjs'
import { Form, Formik } from 'formik'
import BookingsList from '../../components/BookingList/BookingsList'
import { ErrorSnackbars } from '../../components/ErrorSnackbar/ErrorSnackbar'

const cx = classNames.bind(styles)

interface HomePageProps {
  className?: string
}

interface IHome {
  placeId: number
  date: string
}

export const HomePage: React.FC<HomePageProps> = ({ className = '' }) => {
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
    return date.day() === 0
  }

  return (
    <Formik
      initialValues={Initial_Values}
      onSubmit={(values) => {}}
    >
      {({ values, submitForm }) => {
        return (
          <div>
            <Form>
              <Stack
                paddingLeft={25}
                marginTop={5}
              >
                <Stack direction={'row'}>
                  <Stack direction={'column'}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <PlaceDataField
                        places={placesList}
                        placeId={values.placeId}
                      />
                      <DateCalendar
                        className={cx('credentials__calendar')}
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
                        }}
                      />
                    </LocalizationProvider>

                    <Link
                      to={`${routes.booking}`}
                      state={{
                        placeId: values.placeId,
                        date: values.date,
                      }}
                    >
                      <Button
                        className={cx('credentials__button')}
                        onClick={submitForm}
                      >
                        Оставить заявку
                      </Button>
                    </Link>
                  </Stack>
                  <BookingsList bookings={bookings} />
                </Stack>
              </Stack>
            </Form>
            {isError && (
              <ErrorSnackbars
                openOrNot={true}
                message={isError.message}
              />
            )}
          </div>
        )
      }}
    </Formik>
  )
}
