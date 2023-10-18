import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './BookingAdminPage.module.scss'
import classNames from 'classnames/bind'
import {
  deleteBooking,
  editBooking,
  selectSuccess,
} from '../../redux/features/BookingSlice'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { selectError, selectIsLoading } from '../../redux/features/PlacesSlice'
import { useLocation } from 'react-router-dom'
import { RoleDataField } from '../../components/RolesDataField/RoleDataField'
import {
  IBookingAdminInfo,
  getBookingById,
  selectBookingInfo,
} from '../../redux/features/BookingInfoSlice'
import { ErrorSnackbars } from '../../components/ErrorSnackbar/ErrorSnackbar'
import { BookingSchema } from '../../validation/BookingFormValidator'
import { CustomModal } from '../../components/CustomModal/CustomModal'
import { routes } from '../../routing/config'
import dayjs from 'dayjs'
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
  const isSuccess = useAppSelector(selectSuccess)
  const dispatch = useAppDispatch()

  const [redact, setRedact] = React.useState(false)

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
    setRedact(true)
  }

  const parseTime = (date: string) => {
    const parsedDate = dayjs(date)
    return parsedDate
  }

  if (isSuccess && redact) {
    return (
      <CustomModal
        title='Успех'
        description='Запрос исполнен успешно'
        buttonLabel='О.К.'
        rout={routes.adminPanel}
      />
    )
  }

  return (
    <Formik
      initialValues={Initial_Values}
      validationSchema={BookingSchema}
      onSubmit={(values) => {
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
        setRedact(true)
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
                <ErrorMessage
                  name='full_name'
                  component={'div'}
                  className={cx('error')}
                />
                <Typography variant='body2'>Номер телефона</Typography>
                <Field
                  as={TextField}
                  name='phone_number'
                  label='Введите номер телефона'
                  value={values.phone_number}
                  className={cx('credentials__textfield')}
                />
                <ErrorMessage
                  name='phone_number'
                  component={'div'}
                  className={cx('error')}
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
                <ErrorMessage
                  name='technical_equipment'
                  component={'div'}
                  className={cx('error')}
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
                <ErrorMessage
                  name='organizer_info'
                  component={'div'}
                  className={cx('error')}
                />
                <RoleDataField role={`${values.role}`} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    defaultValue={parseTime(values.event_start)}
                    onChange={(e: any) =>
                      (values.event_start =
                        e.$y +
                        '-' +
                        (e.$M + 1) +
                        '-' +
                        e.$D +
                        'T' +
                        e.$H +
                        ':' +
                        e.$m +
                        ':00Z')
                    }
                  />
                </LocalizationProvider>
                <ErrorMessage
                  name='event_start'
                  component={'div'}
                  className={cx('error')}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    defaultValue={parseTime(values.event_end)}
                    onChange={(e: any) =>
                      (values.event_end =
                        e.$y +
                        '-' +
                        (e.$M + 1) +
                        '-' +
                        e.$D +
                        'T' +
                        e.$H +
                        ':' +
                        e.$m +
                        ':00Z')
                    }
                  />
                </LocalizationProvider>
                <ErrorMessage
                  name='event_end'
                  component={'div'}
                  className={cx('error')}
                />
                {!values.is_approved && (
                  <Stack
                    direction={'row'}
                    spacing={4}
                  >
                    <Button
                      onClick={() => {
                        values.is_approved = true
                        submitForm()
                      }}
                    >
                      Одобрить заявку
                    </Button>
                    <Button
                      color={'secondary'}
                      onClick={submitForm}
                    >
                      Отложить заявку
                    </Button>
                    <Button
                      color={'warning'}
                      onClick={handleDelete}
                    >
                      Отклонить заявку
                    </Button>
                  </Stack>
                )}
                {values.is_approved && (
                  <Stack
                    direction={'row'}
                    spacing={4}
                  >
                    <Button onClick={submitForm}>Сохранить данные</Button>
                    <Button
                      color={'warning'}
                      onClick={handleDelete}
                    >
                      Удалить мероприятие
                    </Button>
                  </Stack>
                )}
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
