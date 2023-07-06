import React, { useEffect, useState } from 'react'

import { infoLoggedUser, userType } from '../../../firebase/authProvider'
import { CreateAdmin } from '../../firebase/CRUD/crudAdmin'
import { CreateDoctor } from '../../firebase/CRUD/crudMedicos'
import { CreatePatient } from '../../firebase/CRUD/crudPacientes'
import '../../styles/Register/Register.css'

export function RegisterView() {
  const [success, setSuccess] = useState(0)
  const [editer, setEditer] = useState('')

  // Registrar usuario independiente de su rol
  function RegisterUser(data) {
    // Primero Obtener la Info
    data.preventDefault()
    const name = data.target.name.value
    const lastName = data.target.lastName.value
    const email = data.target.email.value
    const password = data.target.password.value
    const verifyPassword = data.target.verify.value
    const rol = data.target.rol.value
    console.log(rol)

    // Validar que contraseña y verify sean iguales
    if (password !== verifyPassword) {
      alert('Contraseñas no coinciden')
      setSuccess(2)
      return
    }

    // verificar el rol y en base a eso crear el perfil
    switch (rol) {
      case '1':
        CreateAdmin(email, password, name, lastName)
        setSuccess(1)
        setTimeout(() => {
          window.location.reload()
        }, 4000)
        break
      case '2':
        CreateDoctor(email, password, name, lastName)
        setSuccess(1)
        setTimeout(() => {
          window.location.reload()
        }, 4000)
        break
      case '3':
        CreatePatient(email, password, name, lastName)
        setSuccess(1)
        setTimeout(() => {
          window.location.reload()
        }, 4000)
        break
      default:
        alert('Elige que rol deseas Crear')
        setSuccess(2)
        break
    }
  }

  async function checkEditer() {
    const whoIsLogged = await userType(infoLoggedUser().uid)
    console.log(await whoIsLogged)
    setEditer(await whoIsLogged)
  }

  useEffect(() => {
    checkEditer()
  }, [editer])

  return (
    <React.Fragment>
      <div className='mx-auto card'>
        <div className='card-body'>
          <h5 className='card-title'>Registrate</h5>
          <form onSubmit={RegisterUser}>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Nombre
              </label>
              <div className='my-input'>
                <div className='icono'>
                  <i className='bi bi-person'></i>
                </div>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  aria-describedby='emailHelp'
                />
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Apellido
              </label>
              <div className='my-input'>
                <div className='icono'>
                  <i className='bi bi-person'></i>
                </div>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  aria-describedby='emailHelp'
                />
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Correo electrónico
              </label>
              <div className='my-input'>
                <div className='icono'>
                  <i className=' bi bi-envelope-fill'></i>
                </div>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  aria-describedby='emailHelp'
                />
              </div>
              <div id='emailHelp' className='form-text'>
                Nunca compartiremos su informacion personal con nadie más
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Contraseña
              </label>
              <div className='my-input'>
                <div className='icono'>
                  <i className='bi bi-key'></i>
                </div>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Verificar Contraseña
              </label>
              <div className='my-input'>
                <div className='icono'>
                  <i className='bi bi-key-fill'></i>
                </div>
                <input type='password' name='verify' className='form-control' />
              </div>
            </div>
            <div className='my-input'>
              <div className='icono'>
                <i className='bi bi-person-circle'></i>
              </div>
              <select
                className='form-select'
                name='rol'
                aria-label='Default select example'
              >
                <option selected>Cual es tu rol?</option>
                {editer === 'Admin' ? (
                  <React.Fragment>
                    <option value='1'>Admin</option>
                    <option value='2'>Medico</option>
                    <option value='3'>Paciente</option>
                  </React.Fragment>
                ) : editer === 'Medico' ? (
                  <React.Fragment>
                    <option value='3'>Paciente</option>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <option value='0'>nadie</option>
                  </React.Fragment>
                )}
              </select>
            </div>

            <button type='submit' className='btn my-btn btn-primary'>
              Enviar
            </button>
          </form>
        </div>
      </div>
      {success === 0 ? (
        <span></span>
      ) : success === 1 ? (
        <div className='alert alert-success' role='alert'>
          Usuario creado exitosamente
        </div>
      ) : success === 2 ? (
        <div className='alert alert-warning' role='alert'>
          Erro al crear usuario verifica todos los campos
        </div>
      ) : (
        <span></span>
      )}
    </React.Fragment>
  )
}
