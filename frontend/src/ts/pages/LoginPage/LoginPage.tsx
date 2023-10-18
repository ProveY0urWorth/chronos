import { Button, CircularProgress, Stack, TextField } from '@mui/material'
import classNames from 'classnames/bind'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  LoginAttempt,
  selectError,
  selectIsLoading,
} from '../../redux/features/AuthSlice'
import styles from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routing/config'
import { ErrorSnackbars } from '../../components/ErrorSnackbar/ErrorSnackbar'

const cx = classNames.bind(styles)
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

  if (isLoading) {
    return <CircularProgress color='inherit' />
  }

  const navigate = useNavigate()

  function handleClick() {
    navigate(routes.adminPanel)
  }

  return (
    <Formik
      initialValues={Initial_values}
      onSubmit={(values) => {
        dispatch(
          LoginAttempt({
            login: values.login,
            password: values.password,
          })
        )
        handleClick()
      }}
    >
      {({ values, submitForm }) => {
        return (
          <div>
            <Form>
              <Stack
                alignItems={'center'}
                spacing={3}
                margin={25}
              >
                <Field
                  as={TextField}
                  name='login'
                  className={cx('credentials__textfield')}
                  label='Логин'
                  value={values.login}
                />
                <Field
                  as={TextField}
                  name='password'
                  type={'password'}
                  className={cx('credentials__textfield')}
                  label='Пароль'
                  value={values.password}
                />
                <Button
                  className={cx('credentials__button')}
                  onClick={submitForm}
                >
                  Войти
                </Button>
              </Stack>
            </Form>
            {isError && (
              <ErrorSnackbars
                openOrNot={true}
                message={isError.message}
              />
            )}
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
