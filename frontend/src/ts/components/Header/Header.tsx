import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../hooks'
//import { logOut } from '../../redux/features/authSlice'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { CustomModal } from '../CustomModal/CustomModal'

const cx = classNames.bind(styles)

interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch()
  const isAdmin = localStorage.getItem('isAdmin')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = () => {
    //dispatch(logOut())
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={cx('header__header', className)}>
        <Typography
          variant='body2'
          className={cx('header__hello-block')}
        >
          {isAdmin === 'true' ? 'Aдмин-панель' : 'SevSU Booking'}
        </Typography>
        <div className={cx('header__hello-block')}>
          <Typography variant='body2'>
            Привет, {isAdmin === 'true' ? 'Администратор' : 'Пользователь'}
          </Typography>
          <Button
            size='large'
            variant='outlined'
            color='inherit'
            onClick={handleOpenModal}
          >
            <Typography variant='body1'>Выйти</Typography>
          </Button>
        </div>
      </div>

      <CustomModal
        buttonLabel='Да'
        description='Вы действительно хотите выйти?'
        title='Предупреждение'
        isOpen={isModalOpen}
        onSubmit={handleLogout}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Header
