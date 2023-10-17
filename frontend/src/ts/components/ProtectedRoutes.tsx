import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '../../hooks'
//import { selectAuthToken } from '../../redux/features/authSlice'
import { routes } from '../routing/config'
//mport Header from './Header/Header'

function ProtectedRoutes() {
  //const token = useAppSelector(selectAuthToken)
  const lsToken = localStorage.getItem('authToken')

  return /*token || */ lsToken ? (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  ) : (
    <Navigate
      to={routes.login}
      replace
    />
  )
}

export default ProtectedRoutes
