import {
  Button,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './BookingPage.module.scss'
import classNames from 'classnames/bind'
import {
  IBooking,
  createBooking,
  selectSuccess,
} from '../../redux/features/BookingSlice'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { selectError } from '../../redux/features/PlacesSlice'
import { useLocation } from 'react-router-dom'
import { RoleDataField } from '../../components/RolesDataField/RoleDataField'
import { ErrorSnackbars } from '../../components/ErrorSnackbar/ErrorSnackbar'
import dayjs from 'dayjs'
import { BookingSchema } from '../../validation/BookingFormValidator'
import { CustomModal } from '../../components/CustomModal/CustomModal'
import { routes } from '../../routing/config'
const cx = classNames.bind(styles)

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  const { placeId, date } = useLocation().state
  const isError = useAppSelector(selectError)
  const isSuccess = useAppSelector(selectSuccess)
  const dispatch = useAppDispatch()

  const Initial_Values: IBooking = {
    full_name: '',
    phone_number: '',
    event_start: '',
    event_end: '',
    technical_equipment: '',
    organizer_info: '',
    role: 0,
    place: placeId,
  }

  if (isSuccess) {
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
        console.log(values)
        console.log(date)
        dispatch(
          createBooking({
            full_name: values.full_name,
            phone_number: values.phone_number,
            event_start: `${date}T${values.event_start}Z`,
            event_end: `${date}T${values.event_end}Z`,
            technical_equipment: values.technical_equipment,
            organizer_info: values.organizer_info,
            role: values.role,
            place: values.place,
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
                spacing={5}
                alignItems={'center'}
              >
                <Stack
                  direction='row'
                  margin-left={20}
                  spacing={10}
                >
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <Typography variant='body2'>ФИО заявителя</Typography>
                      <Field
                        as={TextField}
                        name='full_name'
                        placeholder='Введите ФИО заявителя'
                        value={values.full_name}
                        className={cx('credentials__textfield')}
                      />
                      <ErrorMessage
                        name='full_name'
                        component={'div'}
                        className={cx('error')}
                      />
                    </Stack>
                    <Stack padding={1}>
                      <Typography variant='body2'>Номер телефона</Typography>
                      <Field
                        as={TextField}
                        name='phone_number'
                        placeholder='Введите номер телефона'
                        value={values.phone_number}
                        className={cx('credentials__textfield')}
                      />
                      <ErrorMessage
                        name='phone_number'
                        component={'div'}
                        className={cx('error')}
                      />
                    </Stack>
                    <RoleDataField role={`${values.role}`} />
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <Typography>Время начала</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            minTime={dayjs().set('hour', 8).set('minutes', 30)}
                            maxTime={dayjs().set('hour', 21).set('minutes', 0)}
                            onChange={(e: any) =>
                              (values.event_start = e.$H + ':' + e.$m)
                            }
                          />
                        </LocalizationProvider>
                        <ErrorMessage
                          name='event_start'
                          component={'div'}
                          className={cx('error')}
                        />
                      </Stack>

                      <Stack spacing={1}>
                        <Typography>Время конца</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            minTime={dayjs().set('hour', 9).set('minutes', 0)}
                            maxTime={dayjs().set('hour', 22).set('minutes', 0)}
                            onChange={(e: any) =>
                              (values.event_end = e.$H + ':' + e.$m)
                            }
                          />
                        </LocalizationProvider>
                        <ErrorMessage
                          name='event_end'
                          component={'div'}
                          className={cx('error')}
                        />
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack spacing={5}>
                    <Stack spacing={1}>
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
                    </Stack>
                    <Stack spacing={1}>
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
                    </Stack>
                  </Stack>
                </Stack>

                <Button
                  onClick={submitForm}
                  className={cx('credentials__button')}
                >
                  Отправить заявку
                </Button>
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
