import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/app.css'
import { Footer } from './components/footer/footer'
import { Navbar } from './components/navbar/navbar'
import { Home } from './pages/Home/home'

function App () {
  return (
    <div className='App'>

      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        {/* <Route path='/Admins' element={<Admins/>} />
        <Route path='/Register' element={<RegisterView/>} />
        <Route path='/Dashboard/admin' element={<DashboardAdmin/>} />
        <Route path='/Dashboard/medico' element={<DashboardMedico/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Seguimiento' element={<Seguimiento/>} />
        <Route path='/Progreso' element={<Progreso/>} />
        <Route path='/Terapias' element={<Terapias/>} />
        <Route path='/Historia-Clinica' element={<HistoriasC/>} />
        <Route path='/Login' element={<Login/>} /> */}

      </Routes>
      <Footer />
    </div>
  )
}

export default App
