import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './config'
import { BookingPage } from '../pages/BookingPage/BookingPage'
import { HomePage } from '../pages/HomePage/HomePage'

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
        path='*'
        element={
          <Navigate
            to='/home'
            replace
          />
        }
      />
    </Routes>
  )
}

export default Routing
