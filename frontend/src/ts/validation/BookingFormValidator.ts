import * as Yup from 'yup'

export const BookingSchema = Yup.object().shape({
  full_name: Yup.string().required('Требуется ввести ФИО!'),
  phone_number: Yup.string().required('Требуется ввести номер телефона'),
  role: Yup.number().required('Требуется выбрать роль!'),
})
