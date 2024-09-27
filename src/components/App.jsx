import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InfoPage from '../pages/InfoPage/InfoPage'
import VacationsPage from '../pages/vacationsPage/VacationsPage'
import Nav from '../components/navigation/Nav'
import FavoritePage from '../pages/favorite/FavoritePage'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<InfoPage />} />
        <Route path='/vacationspage' element={<VacationsPage />} />
        <Route path='/favoritepage' element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App