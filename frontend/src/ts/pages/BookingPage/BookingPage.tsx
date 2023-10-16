import {
  Button,
  MenuItem,
  Select,
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
import {
  getPlaces,
  selectError,
  selectIsLoading,
  selectPlaces,
} from '../../redux/features/PlacesSlice'
import { useLocation } from 'react-router-dom'
const cx = classNames.bind(styles)

interface BookingPageProps {
  className?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  const location = useLocation()
  const { placeId, date } = location.state
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const places = useAppSelector(selectPlaces)
  const dispatch = useAppDispatch()

  const Initial_Values: IBooking = {
    fullname: '',
    phoneNumber: '',
    eventStart: '',
    eventFinish: '',
    technicalEquipment: '',
    organizerInfo: '',
    role: 0,
    place: placeId,
  }

  useEffect(() => {
    dispatch(getPlaces())
  }, [dispatch])

  if (!isLoading && !isError) {
    console.log(places)
  }

  return (
    <Formik
      initialValues={Initial_Values}
      //validationSchema={BookingSchema}
      onSubmit={(values) => {
        console.log(values)
        console.log(places)
        dispatch(
          createBooking({
            fullname: 'Жирный пельмень',
            phoneNumber: '+79787210820',
            eventStart: '2023-10-12T08:30:00Z',
            eventFinish: '2023-10-13T12:00:00Z',
            technicalEquipment: 'Ничего не надо',
            organizerInfo: 'Ноль',
            role: 1,
            place: 1,
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
                  name='fullname'
                  label='Введите ФИО заявителя'
                  value={values.fullname}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>Номер телефона</Typography>
                <Field
                  as={TextField}
                  name='phoneNumber'
                  label='Введите номер телефона'
                  value={values.phoneNumber}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>
                  Техническое оборудование
                </Typography>
                <Field
                  as={TextareaAutosize}
                  minRows={3}
                  name='technicalEquipment'
                  placeholder='Введите перечень технического оборудования'
                  value={values.technicalEquipment}
                  className={cx('credentials__textfield')}
                />
                <Typography variant='body2'>
                  Информация о мероприятии
                </Typography>
                <Field
                  as={TextareaAutosize}
                  minRows={3}
                  name='organizerInfo'
                  placeholder='Введите информацию о мероприятии'
                  value={values.organizerInfo}
                  className={cx('credentials__textfield')}
                />
                <Select
                  name='role'
                  label='Роль'
                  value={values.role}
                >
                  <MenuItem
                    value={0}
                    disabled
                  >
                    Не выбрана
                  </MenuItem>
                  <MenuItem value={1}>Студент</MenuItem>
                  <MenuItem value={2}>Преподаватель</MenuItem>
                  <MenuItem value={3}>Внешний организатор</MenuItem>
                </Select>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker onChange={(e: any) => console.log(e.$H)} />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker />
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
