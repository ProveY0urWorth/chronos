import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    body1: {
      fontSize: 15,
      fontWeight: 700,
    },
    body2: {
      fontSize: 15,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 500,
    },
    h2: {
      fontWeight: 700,
      fontSize: 36,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            fontSize: '16px',
            fontWeight: 500,
            width: '100%',
            height: '44px',
            padding: 0,
          },
          '& .css-1mccynf-MuiInputBase-root-MuiOutlinedInput-root': {
            paddingRight: 0,
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },
          '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            borderWidth: '1px',
          },
          '& .MuiInputLabel-root': {
            marginTop: '-4px',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              color: '#000',
              borderWidth: '1px',
            },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            paddingLeft: '20px',
            color: '#000',
          },
        },
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          color: '#000',
          '&.Mui-focused': {
            border: '1px solid #000',
          },
        },
      },
    },
  },
})

export default theme
