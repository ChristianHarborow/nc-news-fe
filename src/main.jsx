import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx'
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <UserProvider>
          <ErrorProvider>
            <App/>
          </ErrorProvider>
        </UserProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
