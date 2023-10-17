import {
  Typography,
  Stack,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import React from 'react'
import classNames from 'classnames/bind'
import { useFormikContext, ErrorMessage } from 'formik'

interface IPlaceDataFieldProps {
  role: string | undefined
}

export const RoleDataField: React.FC<IPlaceDataFieldProps> = ({ role }) => {
  const { setFieldValue } = useFormikContext()
  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue('role', event.target.value)
  }

  return (
    <Stack>
      <Typography variant='body2'>Роль</Typography>
      <Select
        name='role'
        label='Роль'
        value={role}
        onChange={handleChange}
      >
        <MenuItem
          value={0}
          disabled
        >
          Не выбрана
        </MenuItem>
        <MenuItem value={1}>Студент</MenuItem>
        <MenuItem value={2}>Преподаватель</MenuItem>
        <MenuItem value={3}>Внешний организатор</MenuItem>
      </Select>
      {/* <ErrorMessage
        name='placeId'
        component={'div'}
        //className={cx('error')}
      /> */}
    </Stack>
  )
}
