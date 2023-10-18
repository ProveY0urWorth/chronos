import * as React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  )
})

export default function ErrorSnackbars({ openOrNot, message }) {
  const [open, setOpen] = React.useState(openOrNot)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity='error'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
