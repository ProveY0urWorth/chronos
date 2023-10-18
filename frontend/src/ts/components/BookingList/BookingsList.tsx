import React from 'react'
import {
  List,
  ListItem,
  Divider,
  Container,
  Stack,
  Button,
} from '@mui/material'
import {
  IBookingAdminInfo,
  IBookingInfo,
} from '../../redux/features/BookingInfoSlice'
import styles from './BookingsList.module.scss'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { routes } from '../../routing/config'

const cx = classNames.bind(styles)

interface EntityListProps {
  bookings: IBookingAdminInfo[]
}

const BookingsList: React.FC<EntityListProps> = ({ bookings }) => {
  const isAdmin = localStorage.getItem('isAdmin')
  const parseTime = (date: string) => {
    const parsedDate = dayjs(date)
    const hour = parsedDate.format('HH')
    const minutes = parsedDate.format('mm')
    return hour + ':' + minutes
  }

  return (
    <Container className={cx('container')}>
      <List>
        {bookings.map((booking) => (
          <div key={booking.unique_id}>
            <ListItem>
              <Stack
                direction={'row'}
                spacing={4}
              >
                <Stack>
                  <Typography>ФИО: {booking.full_name}</Typography>
                  <Typography>Телефон: {booking.phone_number}</Typography>
                  <Typography>
                    Роль:{' '}
                    {booking.role == 1
                      ? 'Студент'
                      : booking.role == 2
                      ? 'Преподаватель'
                      : 'Внешний организатор'}
                  </Typography>
                  <Typography>
                    {parseTime(booking.event_start) +
                      ' - ' +
                      parseTime(booking.event_end)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography>Техническое оборудование:</Typography>
                  <p>{booking.technical_equipment}</p>
                  <Typography>Информация об организаторе:</Typography>
                  <p>{booking.organizer_info}</p>
                </Stack>
                <Link
                  to={`${routes.adminBooking}`}
                  state={{
                    placeId: booking.place,
                    unique_id: booking.unique_id,
                  }}
                >
                  <Button
                    sx={{
                      display: { xl: isAdmin == 'true' ? 'flex' : 'none' },
                      maxHeight: { xl: 50 },
                    }}
                  >
                    {booking.is_approved
                      ? 'Открыть мероприятие'
                      : 'Открыть заявку'}
                  </Button>
                </Link>
              </Stack>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  )
}

export default BookingsList
