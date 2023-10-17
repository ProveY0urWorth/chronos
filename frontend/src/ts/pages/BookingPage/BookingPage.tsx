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

  const Initial_Values: IBooking = {
    fullname: '',
    phoneNumber: '',
    eventStart: '08:30:00',
    eventFinish: '10:00:00',
    technicalEquipment: '',
    organizerInfo: '',
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
            fullname: values.fullname,
            phoneNumber: values.phoneNumber,
            eventStart: `${date}T${values.eventStart}Z`,
            eventFinish: `${date}T${values.eventFinish}Z`,
            technicalEquipment: values.technicalEquipment,
            organizerInfo: values.organizerInfo,
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
                <RoleDataField role={`${values.role}`} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={(e: any) =>
                      (values.eventStart = e.$H + ':' + e.$m + ':00')
                    }
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={(e: any) =>
                      //console.log(e.$H + ':' + e.$m)
                      (values.eventFinish = e.$H + ':' + e.$m + ':00')
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
