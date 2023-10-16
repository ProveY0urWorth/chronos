import { Typography, Autocomplete, TextField, Box, Stack } from '@mui/material'
import React from 'react'
import classNames from 'classnames/bind'
import { useFormikContext, ErrorMessage } from 'formik'
import { IPlace } from '../redux/features/PlacesSlice'

interface IPlaceDataFieldProps {
  places: { label: string; value: number }[]
  placeId: number | null
  mode: boolean
}

const getPlaceValueById = (place: any, placeId: any) => {
  return place.find((element: any) => {
    return element.value === placeId
  })
}

export const PlaceDataField: React.FC<IPlaceDataFieldProps> = ({
  places,
  placeId,
  mode,
}) => {
  const [inputPlaceName, setPlaceName] = React.useState('')
  //const { setFieldValue } = useFormikContext()

  return (
    <Stack>
      <Typography variant='body2'>Локация</Typography>
      <Autocomplete
        disabled={!mode}
        options={places}
        inputValue={inputPlaceName}
        value={getPlaceValueById(places, placeId)}
        onChange={(_, value) => {
          if (value) {
            console.log(value)
            //setFieldValue('placeId', value.value)
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
