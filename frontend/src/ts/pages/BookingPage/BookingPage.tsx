import {
  Button,
  SelectChangeEvent,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './BookingPage.module.scss'
import classNames from 'classnames/bind'
import { IBooking, createBooking } from '../../redux/features/BookingSlice'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { selectError, selectIsLoading } from '../../redux/features/PlacesSlice'
import { useLocation } from 'react-router-dom'
import { RoleDataField } from '../../components/RolesDataField/RoleDataField'
const cx = classNames.bind(styles)

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  const location = useLocation()
  const { placeId, date } = location.state
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  console.log(date)

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

  useEffect(() => {
    //dispatch()
  }, [dispatch])

  return (
    <Formik
      initialValues={Initial_Values}
      //validationSchema={BookingSchema}
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
                      (values.event_start = e.$H + ':' + e.$m)
                    }
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={(e: any) =>
                      //console.log(e.$H + ':' + e.$m)
                      (values.event_end = e.$H + ':' + e.$m)
                    }
                  />
                </LocalizationProvider>
                <Button
                  onClick={submitForm}
                  className={cx('credentials__button')}
                >
                  Отправить заявку
                </Button>
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
