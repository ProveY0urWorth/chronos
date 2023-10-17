import { Outlet } from 'react-router'
//import { selectAuthToken } from '../../redux/features/authSlice'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function ProtectedRoutes() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default ProtectedRoutes
