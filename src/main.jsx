import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './components/dataProvider/DataProvider.jsx'
import { reducer, initialState } from './utility/Reducer.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState} >
    <App />
    </DataProvider>
   
  </StrictMode>,
)
//frontend deployment domain
//https://amazon-frontend-fawn.vercel.app/
//backend deployment domain
//https://amazon-api-yuos.onrender.com/
