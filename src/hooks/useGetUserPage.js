import { useEffect, useMemo, useState } from 'react'
import { getUser, updateUser } from '../firebase/utils/user'
import { useUser } from './useUser'
import { USER_POSSIBLE_STATES } from '../utils/user-possible-states'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useGetUserPage ({ id }) {
  const [pageUser, setPageUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(null)
  const [editedFields, setEditedFields] = useState({})

  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const loggedUser = useUser()

  useEffect(() => {
    if (loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN || loggedUser === USER_POSSIBLE_STATES.NOT_LOGGED) return
    setLoading(true)
    getUser(id)
      .then(setPageUser)
      .catch(seterror)
      .finally(() => setLoading(false))
  }, [loggedUser])

  useEffect(() => {
    if (loggedUser?.role === 'admin' || loggedUser?.id === id || loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN) return
    navigate('/login', { replace: true })
  }, [loggedUser])

  const entrys = useMemo(() => {
    if (!pageUser) return []

    if (pageUser.role === 'patient') {
      return [
        { slug: 'email', name: 'EMAIL', element: <p>{pageUser.email}</p>, value: pageUser.email, inputType: 'email' },
        { slug: 'documento', name: 'DNI', element: <p>{pageUser.documento}</p>, value: pageUser.documento, inputType: 'number' },
        {
          slug: 'active',
          name: 'ESTADO',
          element: <p>{pageUser.active ? 'Activo' : 'No activo'}</p>,
          value: pageUser.active ? 'Activo' : 'No activo',
          type: 'select',
          options: [
            { value: true, text: 'Activo' },
            { value: false, text: 'No activo' }
          ]
        },
        {
          slug: 'medico',
          name: 'MEDICO',
          notEditable: true,
          element: <>
          {
            pageUser.medico_asignado?.nombre
              ? <a href={`/usuario/${pageUser.medico_asignado.id}`}>Dr. {pageUser.medico_asignado.nombre} {pageUser.medico_asignado.apellido}</a>
              : <p>Ninguno</p>
          }
        </>
        }
      ]
    }
  }, [pageUser])

  const handleSubmit = async () => {
    if (Object.entries(editedFields).length <= 0) return

    await updateUser(id, 'user', editedFields)
      .then(() => {
        setPageUser(prev => {
          const newUser = { ...prev }
          for (const [key, value] of Object.entries(editedFields)) {
            newUser[key] = value
          }
          return newUser
        })
        setSuccess(true)
        setEditedFields({})
        toast(`Se modificó correctamente el paciente ${pageUser.nombre} ${pageUser.apellido}`)
      })
  }

  return { pageUser, loading, error, loggedUser, entrys, editedFields, success, setEditedFields, handleSubmit }
}
