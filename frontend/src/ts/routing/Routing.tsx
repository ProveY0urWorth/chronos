import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './config'
import { BookingPage } from '../pages/BookingPage/BookingPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { AdminHomePage } from '../pages/AdminHomePage/AdminHomePage'
import { BookingAdminPage } from '../pages/BookingAdminPage/BookingAdminPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'

function Routing() {
  return (
    <Routes>
      <Route path={routes.base} />
      <Route
        path={routes.booking}
        element={<BookingPage />}
      />
      <Route
        path={routes.home}
        element={<HomePage />}
      />
      <Route
        path={routes.adminPanel}
        element={<AdminHomePage />}
      />
      <Route
        path={routes.adminBooking}
        element={<BookingAdminPage />}
      />
      <Route
        path={routes.login}
        element={<LoginPage />}
      />
      <Route
        path={routes.any}
        element={
          <Navigate
            to={routes.home}
            replace
          />
        }
      />
    </Routes>
  )
}

export default Routing
