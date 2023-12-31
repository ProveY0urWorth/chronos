import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../hooks'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { CustomModal } from '../CustomModal/CustomModal'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/features/AuthSlice'
import { routes } from '../../routing/config'

const cx = classNames.bind(styles)

interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const isAdmin = localStorage.getItem('isAdmin')
  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  function handleClick() {
    navigate(routes.home)
  }

  const handleLogout = () => {
    dispatch(logOut())
    handleCloseModal()
    handleClick()
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
        <a href={isAdmin === 'true' ? routes.adminPanel : routes.home}>
          <img
            src='../../../../public/headerLogo.png'
            height={56}
            alt='Лого СевГУ'
            color='white'
          />
        </a>
        <div className={cx('header__hello-block')}>
          <Typography variant='body2'>
            Привет, {isAdmin === 'true' ? 'Администратор' : 'Пользователь'}
          </Typography>
          <Button
            size='large'
            variant='outlined'
            color='inherit'
            onClick={handleOpenModal}
            sx={{
              display: { xl: isAdmin == 'true' ? 'flex' : 'none' },
            }}
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
