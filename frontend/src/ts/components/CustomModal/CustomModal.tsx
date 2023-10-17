import * as React from 'react'

import { Link } from 'react-router-dom'

import { Button, Stack, Typography, Box, Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const buttonStyles = {
  width: '120px'
}

interface IModalProps {
  title: string
  description: string
  buttonLabel: string
  rout?: string
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: () => void
}

export const CustomModal: React.FC<IModalProps> = ({
  title,
  description,
  rout = null,
  buttonLabel,
  isOpen = true,
  onClose,
  onSubmit
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body2" align="center" style={{ wordWrap: 'break-word' }}>
            {description}
          </Typography>
          {rout ? (
            <Link to={`${rout}`}>
              <Button size="large">{buttonLabel}</Button>
            </Link>
          ) : (
            <Stack direction="row" alignItems="center" spacing={3}>
              <Button size="large" onClick={onSubmit} sx={{ ...buttonStyles }}>
                {buttonLabel}
              </Button>
              <Button size="large" color="error" onClick={onClose} sx={{ ...buttonStyles }}>
                Отмена
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Modal>
  )
}
