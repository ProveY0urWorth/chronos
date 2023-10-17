import React from 'react'
import { List, ListItem, ListItemText, Divider, Container } from '@mui/material'
import { IBooking } from '../redux/features/BookingSlice'
import { IBookingInfo } from '../redux/features/BookingInfoSlice'

interface Booking {
  unique_id: number
  full_name: string
  phone_number: string
}

/*event_end: "2023-10-19T04:20:00Z"
​​
event_start: "2023-10-19T04:20:00Z"
​​
full_name: "xasvcs"
​​
organizer_info: "sczsczsc"
​​
phone_number: "cdsxcz"
​​
place: 4
​​
role: 2
​​
technical_equipment: "scszczs"
​​
unique_id: 9 */

interface EntityListProps {
  bookings: IBookingInfo[]
}

const BookingsList: React.FC<EntityListProps> = ({ bookings }) => {
  console.log(bookings)
  return (
    <Container>
      <List>
        {bookings.map((booking) => (
          <div key={booking.unique_id}>
            <ListItem>
              <ListItemText
                primary={booking.full_name}
                secondary={booking.phone_number}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  )
}

export default BookingsList
