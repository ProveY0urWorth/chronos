import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './BookingAdminPage.module.scss'
import classNames from 'classnames/bind'
import {
  IBooking,
  createBooking,
  deleteBooking,
  editBooking,
} from '../../redux/features/BookingSlice'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { selectError, selectIsLoading } from '../../redux/features/PlacesSlice'
import { useLocation } from 'react-router-dom'
import { RoleDataField } from '../../components/RolesDataField/RoleDataField'
import {
  IBookingAdminInfo,
  getBookingById,
  selectBookingInfo,
} from '../../redux/features/BookingInfoSlice'
const cx = classNames.bind(styles)

interface BookingAdminPageProps {
  className?: string
}

export const BookingAdminPage: React.FC<BookingAdminPageProps> = ({
  className = '',
}) => {
  const location = useLocation()
  const { placeId, unique_id } = location.state
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const bookingInfo = useAppSelector(selectBookingInfo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBookingById({ id: unique_id }))
  }, [dispatch])

  if (isLoading) {
    return <CircularProgress color='inherit' />
  }

  let Initial_Values: IBookingAdminInfo = {
    full_name: '',
    phone_number: '',
    event_start: '',
    event_end: '',
    technical_equipment: '',
    organizer_info: '',
    role: 0,
    place: placeId,
    is_approved: false,
    unique_id: unique_id,
  }

  if (bookingInfo) {
    Initial_Values = {
      full_name: bookingInfo.full_name,
      phone_number: bookingInfo.phone_number,
      event_start: bookingInfo.event_start,
      event_end: bookingInfo.event_end,
      technical_equipment: bookingInfo.technical_equipment,
      organizer_info: bookingInfo.organizer_info,
      role: bookingInfo.role,
      place: placeId,
      is_approved: false,
      unique_id: unique_id,
    }
  }

  const handleDelete = () => {
    dispatch(deleteBooking({ id: unique_id }))
  }

  return (
    <Formik
      initialValues={Initial_Values}
      //validationSchema={BookingSchema}
      onSubmit={(values) => {
        console.log(values)
        dispatch(
          editBooking({
            full_name: values.full_name,
            phone_number: values.phone_number,
            event_start: `${values.event_start}`,
            event_end: `${values.event_end}`,
            technical_equipment: values.technical_equipment,
            organizer_info: values.organizer_info,
            role: values.role,
            place: values.place,
            is_approved: values.is_approved,
            unique_id: unique_id,
          })
        )
      }}
    >
      {({ values, submitForm }) => {
        return (
          <div>
            <Form>
              <Stack
                direction='column'
                spacing={1}
                alignItems={'center'}
              >
                <Typography variant='body2'>ФИО заявителя</Typography>
                <Field
                  as={TextField}
                  name='full_name'
                  label='Введите ФИО заявителя'
                  value={values.full_name}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>Номер телефона</Typography>
                <Field
                  as={TextField}
                  name='phone_number'
                  label='Введите номер телефона'
                  value={values.phone_number}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>
                  Техническое оборудование
                </Typography>
                <Field
                  as={TextareaAutosize}
                  minRows={3}
                  name='technical_equipment'
                  placeholder='Введите перечень технического оборудования'
                  value={values.technical_equipment}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>
                  Информация о мероприятии
                </Typography>
                <Field
                  as={TextareaAutosize}
                  minRows={3}
                  name='organizer_info'
                  placeholder='Введите информацию о мероприятии'
                  value={values.organizer_info}
                  className={cx('credentials__textfield')}
                />
                <RoleDataField role={`${values.role}`} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={(e: any) =>
                      (values.event_start = e.$H + ':' + e.$m + ':00')
                    }
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={(e: any) =>
                      //console.log(e.$H + ':' + e.$m)
                      (values.event_end = e.$H + ':' + e.$m + ':00')
                    }
                  />
                </LocalizationProvider>
                <Stack
                  direction={'row'}
                  spacing={4}
                >
                  <Button
                    onClick={(e) => {
                      values.is_approved = true
                      submitForm()
                    }}
                    //className={cx('credentials__button')}
                  >
                    Одобрить заявку
                  </Button>
                  <Button
                    color={'warning'}
                    onClick={handleDelete}
                  >
                    Отклонить заявку
                  </Button>
                </Stack>
              </Stack>
            </Form>
            {/* {isError && (
              <ErrorSnackbars
                openOrNot={true}
                message={isError.message}
              />
            )} */}
          </div>
        )
      }}
    </Formik>
  )
}
