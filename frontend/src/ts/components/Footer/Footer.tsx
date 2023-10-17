import { Typography, Container } from '@mui/material'
import styles from './footer.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const Footer = () => {
  return (
    <footer className={cx('footer__footer')}>
      <Container maxWidth='lg'>
        <Typography
          variant='body2'
          align='center'
          className={cx('footer__hello-block')}
        >
          © {new Date().getFullYear()} SevSU Booking
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
