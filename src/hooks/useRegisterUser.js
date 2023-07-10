import { useCallback, useState } from 'react'
import { auth } from '../firebase/config'
import { uploadImage } from '../firebase/utils/user'
import { API_ADMIN_URL } from '../utils/prod-dev-variables'
import { toast } from 'react-toastify'

export function useRegisterUser() {
  console.log(API_ADMIN_URL)
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImage = useCallback((e) => {
    const files = e.target.files
    if (!(files != null && files.length > 0)) return

    const url = URL.createObjectURL(files[0])
    setImage({ file: files[0], url })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    let imageSrc

    if (image) {
      try {
        imageSrc = await uploadImage(image.file)
      } catch (err) {
        console.error(err)
        setError(err?.message || 'Hubo un error al subir la imágen')
        return
      }
    }

    const data = new FormData(e.target)
    const values = Object.fromEntries(data)

    const imageToAppend = imageSrc
      ? { url: imageSrc.src, path: imageSrc.path }
      : null

    const token = await auth.currentUser.getIdToken(true)

    fetch(API_ADMIN_URL, {
      body: JSON.stringify({ ...values, image: imageToAppend }),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
          toast.error('Hubo un error al crear el usuario')
          return
        } else {
          toast(`Se creó con exito el usuario ${res.nombre} ${res.apellido}`)
          e.target.reset()
        }
      })
      .finally(() => {
        setLoading(false)
        setImage(null)
      })
  }

  return { handleSubmit, handleImage, setImage, image, error, loading }
}
