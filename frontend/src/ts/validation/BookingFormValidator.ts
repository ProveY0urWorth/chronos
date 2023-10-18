import * as Yup from 'yup'

export const BookingSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Требуется ввести ФИО!')
    .test('word-count', 'ФИО должно быть полным', (value) => {
      if (value) {
        const words = value.split(' ')
        return words.length === 3
      }
      return false
    })
    .matches(
      /^[A-Za-zА-Яа-я\s]*$/,
      'ФИО должно содержать только буквы и пробелы'
    ),

  phone_number: Yup.string()
    .required('Требуется ввести номер телефона')
    .matches(
      /^\+7[0-9]{10}$/,
      'Номер телефона должен начинаться с "+7" и содержать 10 цифр без пробелов и дефисов'
    ),
  role: Yup.number()
    .required('Требуется выбрать роль!')
    .min(1, 'Требуется выбрать роль!'),
  event_start: Yup.string().required('Требуется выбрать время!'),
  event_end: Yup.string().required('Требуется выбрать время!'),
  technical_equipment: Yup.string().required('Требуется указать оборудование!'),
  organizer_info: Yup.string().required(
    'Требуется указать информацию о мероприятии!'
  ),
})
