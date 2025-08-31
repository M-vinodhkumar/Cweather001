import React from 'react'
import Weather from './components/Weather'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <div className='bg-blue-200 h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
