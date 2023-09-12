import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/footer/footer'
import { Navbar } from './components/navbar/navbar'
import { Home } from './pages/Home/home'
import { Login } from './pages/Login/login'
import { ProtectedRoute } from './components/protected-route/protected-route'
import { useUser } from './hooks/useUser'
import { USER_POSSIBLE_STATES } from './utils/user-possible-states'
import { DashboardLayout } from './components/layouts/DashboardLayout'
import { Pacientes } from './pages/Pacientes/Pacientes'
import { Asignacion } from './pages/Dashboard/asignacion/Asignacion'
import { Register } from './pages/Dashboard/register/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Usuario } from './pages/Usuario/Usuario'
import { UserLayout } from './components/layouts/user-layout/user-layout'
import { Deberes } from './pages/Deberes/Deberes'
import { Resultados } from './pages/Resultados/resultados'
import { PasswordChange } from './components/modals/password-change/password-change'
import { ResultsContextProvider } from './contexts/ResultsContext'

function App() {
  const [passwordShowing, setPasswordShowing] = useState(false)
  const user = useUser()
  const defaultCondition = user === USER_POSSIBLE_STATES.NOT_KNOWN

  useEffect(() => {
    if (!user) return
    if (!user?.passwordSetted && !localStorage.getItem('pass-setted')) {
      setPasswordShowing(true)
    }
  }, [user])

  const closeModal = () => setPasswordShowing(false)
  
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route
          path='/dashboard/asignacion'
          element={
            <ProtectedRoute
              condition={defaultCondition || user?.role === 'admin'}
            >
              <DashboardLayout>
                <Asignacion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/register'
          element={
            <ProtectedRoute
              condition={defaultCondition || user?.role === 'admin'}
            >
              <DashboardLayout>
                <Register />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/pacientes'
          element={
            <ProtectedRoute
              condition={
                defaultCondition ||
                user?.role === 'admin' ||
                user?.role === 'doctor'
              }
            >
              <Pacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/paciente/:id'}
          element={
            <ProtectedRoute condition={true}>
              <UserLayout isRelative={true}>
                <Usuario />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={'/paciente/:id/pruebas-clinicas'}
          element={
            <ProtectedRoute condition={true}>
              <UserLayout isRelative={true}>
                <Deberes />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={'/paciente/:id/resultados'}
          element={
            <ProtectedRoute condition={true}>
              <UserLayout isRelative={true}>
                <ResultsContextProvider>
                  <Resultados />
                </ResultsContextProvider>
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profesional/:id'}
          element={
            <ProtectedRoute condition={true}>
              <Usuario type='doctor' />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/admin/:id'}
          element={
            <ProtectedRoute condition={true}>
              <Usuario type='admin' />
            </ProtectedRoute>
          }
        />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Footer />

      {
        passwordShowing && <PasswordChange closeModal={closeModal} id={user.id}/>
      }

      <ToastContainer
        position='top-right'
        autoClose={3000}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
      />
    </div>
  )
}

export default App
