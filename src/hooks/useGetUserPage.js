import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  deleteImage,
  getUser,
  updateUser,
  uploadImage,
} from '../firebase/utils/user'
import { useUser } from './useUser'
import { USER_POSSIBLE_STATES } from '../utils/user-possible-states'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_ADMIN_URL } from '../utils/prod-dev-variables'
import { auth } from '../firebase/config'

export function useGetUserPage({ id, type }) {
  const [pageUser, setPageUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editedFields, setEditedFields] = useState({})
  const [success, setSuccess] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [passwordEditing, setPasswordEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const navigate = useNavigate()
  const loggedUser = useUser()

  const inputRef = useRef()

  const handleImage = useCallback((e) => {
    const files = e.target.files
    if (!(files != null && files.length > 0)) return

    const src = URL.createObjectURL(files[0])
    setImage({ file: files[0], src })
  }, [])

  const handleImageClear = useCallback(() => {
    setImage(null)
    inputRef.current.value = null
  })

  useEffect(() => {
    if (
      loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN ||
      loggedUser === USER_POSSIBLE_STATES.NOT_LOGGED
    )
      return
    setLoading(true)
    getUser(id, type)
      .then(setPageUser)
      .catch((err) => {
        const errMessage = err instanceof Error ? err.message : err
        setError(errMessage)
      })
      .finally(() => setLoading(false))
  }, [loggedUser])

  useEffect(() => {
    if (
      loggedUser?.role === 'admin' ||
      loggedUser?.id === id ||
      loggedUser.role === 'doctor' ||
      loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN
    )
      return
    navigate('/login', { replace: true })
  }, [loggedUser])

  const entrys = useMemo(() => {
    if (!pageUser) return []

    if (pageUser.role === 'patient') {
      return [
        {
          slug: 'email',
          name: 'EMAIL',
          element: <p>{pageUser.email}</p>,
          value: pageUser.email,
          inputType: 'email',
          visibleOnlyToOwn: false,
        },
        {
          slug: 'documento',
          name: 'DNI',
          element: <p>{pageUser.documento}</p>,
          value: pageUser.documento,
          inputType: 'number',
          visibleOnlyToOwn: true,
        },
        {
          slug: 'active',
          name: 'ESTADO',
          element: <p>{pageUser.active ? 'Activo' : 'No activo'}</p>,
          value: pageUser.active ? 'Activo' : 'No activo',
          type: 'select',
          options: [
            { value: true, text: 'Activo' },
            { value: false, text: 'No activo' },
          ],
          visibleToOwn: false,
        },
        {
          slug: 'medico',
          name: 'MEDICO',
          notEditable: true,
          element: (
            <>
              {pageUser.medico_asignado?.nombre ? (
                <Link to={`/doctor/${pageUser.medico_asignado.id}`}>
                  Dr. {pageUser.medico_asignado.nombre}{' '}{pageUser.medico_asignado.apellido}
                </Link>
              ) : (
                <p>Ninguno</p>
              )}
            </>
          ),
        },
      ]
    }
    if (pageUser.role === 'doctor' || pageUser.role === 'admin') {
      return [
        {
          slug: 'email',
          name: 'EMAIL',
          element: <p>{pageUser.email}</p>,
          value: pageUser.email,
          inputType: 'email',
          visibleOnlyToOwn: true,
        },
        {
          slug: 'documento',
          name: 'DNI',
          element: <p>{pageUser.documento}</p>,
          value: pageUser.documento,
          inputType: 'number',
          visibleOnlyToOwn: true,
        },
      ]

    }
  }, [pageUser])

  const handleSubmit = useCallback(async () => {
    if (Object.entries(editedFields).length <= 0 && image === null) return
    console.log(loggedUser.role !== 'admin' || loggedUser.id !== id)
    if (loggedUser.role !== 'admin' && loggedUser.id !== id) {
      toast.error('No tienes permisos para hacer esto.')
      return
    }

    setUpdateLoading(true)

    let imageData
    console.log(pageUser.image)
    if (image !== null) {
      if (pageUser.image !== null) {
        console.log(pageUser.image)
        await deleteImage(pageUser.image.path).catch(() =>
          toast.error('Hubo un error al borrar la imágen antigua del usuario.'),
        )
      }
      imageData = await uploadImage(image.file)
    }

    const token = await auth.currentUser.getIdToken(true)

    fetch(API_ADMIN_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ ...editedFields, userToModify: id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('')
      })
      .catch(() => {
      })

    const fieldsToUpdate = imageData
      ? { ...editedFields, image: imageData }
      : { ...editedFields }
    console.log(fieldsToUpdate)
    updateUser(id, type, fieldsToUpdate)
      .then(() => {
        setPageUser((prev) => {
          const newUser = { ...prev }
          for (const [key, value] of Object.entries(fieldsToUpdate)) {
            newUser[key] = value
          }
          return newUser
        })
        setSuccess(true)
        handleImageClear()
        setEditedFields({})
        toast(
          `Se modificó correctamente el ${type === 'patient' ? 'paciente' : 'doctor'} ${pageUser.nombre} ${pageUser.apellido}`,
        )
      })
      .catch((err) => {
        const errMessage = err instanceof Error ? err.message : err
        toast.error(`Hubo un error al modificar el paciente: ${errMessage}`)
      })
      .finally(() => setUpdateLoading(false))
  }, [editedFields, id, pageUser, image])

  useEffect(() => {
    if (success) setSuccess(false)
  }, [success])

  return {
    pageUser,
    loading,
    error,
    inputRef,
    entrys,
    editedFields,
    success,
    updateLoading,
    image,
    loggedUser,
    passwordEditing,
    deleting,
    setDeleting,
    setPasswordEditing,
    handleImage,
    handleImageClear,
    setEditedFields,
    handleSubmit,
  }
}
