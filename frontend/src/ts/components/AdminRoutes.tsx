import { Navigate, Outlet } from 'react-router'
import { routes } from '../routing/config'

function AdminRoutes() {
  const isAdmin = localStorage.getItem('isAdmin')

  return isAdmin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate
      to={routes.login}
      replace
    />
  )
}

export default AdminRoutes
