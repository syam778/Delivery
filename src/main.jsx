/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import DelContextProvider from './DelContext/DelContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DelContextProvider>
    <App/>
  </DelContextProvider>
  
  </BrowserRouter>
)
*/
import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import DelContextProvider from './DelContext/DelContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DelContextProvider>
        <App/>
      </DelContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)