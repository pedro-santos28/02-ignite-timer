import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CyclesContextProvider } from './contexts/CycleContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <ToastContainer />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
