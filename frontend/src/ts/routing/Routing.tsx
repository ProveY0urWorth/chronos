import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './config'
import { BookingPage } from '../pages/BookingPage/BookingPage'

function Routing() {
  return (
    <Routes>
      <Route path={routes.base} />
      <Route
        path={routes.booking}
        element={<BookingPage />}
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
