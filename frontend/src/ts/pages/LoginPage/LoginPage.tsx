import { Button, Stack, TextField } from '@mui/material'
import classNames from 'classnames/bind'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  LoginAttempt,
  selectError,
  selectIsLoading,
} from '../../redux/features/AuthSlice'
interface LoginPageProps {
  className?: string
}

export const LoginPage: React.FC<LoginPageProps> = ({ className = '' }) => {
  const Initial_values = {
    login: '',
    password: '',
  }
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  if (isError) {
    console.log('Error')
  }

  if (isLoading) {
    console.log('loading')
  }

  return (
    <Formik
      initialValues={Initial_values}
      onSubmit={(values) => {
        console.log(values)
        dispatch(
          LoginAttempt({
            login: values.login,
            password: values.password,
          })
        )
      }}
    >
      {({ values, submitForm }) => {
        return (
          <Form>
            <Stack>
              <Field
                as={TextField}
                name='login'
                label='Логин'
                value={values.login}
              />
              <Field
                as={TextField}
                name='password'
                label='Пароль'
                value={values.password}
              />
              <Button onClick={submitForm}>ЗАЯВОЧКА</Button>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}
