import { Typography, Autocomplete, TextField, Box, Stack } from '@mui/material'
import React from 'react'
import classNames from 'classnames/bind'
import { useFormikContext, ErrorMessage } from 'formik'
import styles from './PlacesDataField.module.scss'

const cx = classNames.bind(styles)

interface IPlaceDataFieldProps {
  places: { label: string; value: number }[]
  placeId: number | null
}

const getPlaceValueById = (place: any, placeId: any) => {
  return place.find((element: any) => {
    return element.value === placeId
  })
}

export const PlaceDataField: React.FC<IPlaceDataFieldProps> = ({
  places,
  placeId,
}) => {
  const [inputPlaceName, setPlaceName] = React.useState('')
  const { setFieldValue } = useFormikContext()

  return (
    <Stack spacing={2}>
      <Typography variant='body2'>Локация</Typography>
      <Autocomplete
        options={places}
        inputValue={inputPlaceName}
        className={cx('credentials__textfield')}
        value={getPlaceValueById(places, placeId)}
        onChange={(_, value) => {
          if (value) {
            console.log(value.value)
            setFieldValue('placeId', value.value)
          }
        }}
        onInputChange={(_, newInputValue) => {
          setPlaceName(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Локация'
            variant='outlined'
            fullWidth
          />
        )}
        noOptionsText={
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            Нет локаций удовлетворяющих параметрам
          </Box>
        }
      />
      {/* <ErrorMessage
        name='placeId'
        component={'div'}
        //className={cx('error')}
      /> */}
    </Stack>
  )
}
