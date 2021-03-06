import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.css'
import { BrowserRouter } from 'react-router-dom' 
import { AuthContextProvider } from './contexts/AuthContext'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
