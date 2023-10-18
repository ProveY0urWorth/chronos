import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme.ts'
import { store } from './ts/redux/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
