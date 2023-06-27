import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/footer/footer'
import { Navbar } from './components/navbar/navbar'
import { Home } from './pages/Home/home'
import { Login } from './pages/Login/login'
import { ProtectedRoute } from './components/protected-route/protected-route'
import { useUser } from './hooks/useUser'
import { USER_POSSIBLE_STATES } from './utils/user-possible-states'
import { DashboardLayout } from './pages/Dashboard/DashboardLayout'
import { Pacientes } from './pages/Pacientes/Pacientes'
import { Asignacion } from './pages/Dashboard/Asignacion'

function App () {
  const user = useUser()
  const defaultCondition = user === USER_POSSIBLE_STATES.NOT_KNOWN

  return (
    <div className='App'>

      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute condition={defaultCondition || (user?.role === 'admin')}>
              <DashboardLayout></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/asignacion'
          element={
            <ProtectedRoute condition={defaultCondition || (user?.role === 'admin')}>
              <DashboardLayout>
                <Asignacion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/register'
          element={
            <ProtectedRoute condition={defaultCondition || (user?.role === 'admin')}>
              <DashboardLayout>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/pacientes'
          element={
            <ProtectedRoute condition={defaultCondition || (user?.role === 'admin' || user?.role === 'doctor')}>
              <Pacientes />
            </ProtectedRoute>
          }
        />

        {/* <Route path='/Admins' element={<Admins/>} />
        <Route path='/Register' element={<RegisterView/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Seguimiento' element={<Seguimiento/>} />
        <Route path='/Progreso' element={<Progreso/>} />
        <Route path='/Terapias' element={<Terapias/>} />
        <Route path='/Historia-Clinica' element={<HistoriasC/>} />
      */}
        <Route path='/Login' element={<Login />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
