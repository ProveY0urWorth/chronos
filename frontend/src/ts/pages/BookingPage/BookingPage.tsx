import { Button, Stack, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import styles from './BookingPage.module.scss'
import classNames from 'classnames/bind'
import { IBooking } from '../../redux/features/BookingSlice'
const cx = classNames.bind(styles)

interface BookingPageProps {
  className?: string
}

const Initial_Values: IBooking = {
  fullname: '',
  phoneNumber: '',
  eventStart: '',
  eventFinish: '',
  technicalEquipment: '',
  organizerInfo: '',
  role: 0,
  place: 0,
}

export const BookingPage: React.FC<BookingPageProps> = ({ className = '' }) => {
  return (
    <Formik
      initialValues={Initial_Values}
      //validationSchema={CredentialSchema}
      onSubmit={(values) => {
        console.log(values)
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
                <TextField></TextField>
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
