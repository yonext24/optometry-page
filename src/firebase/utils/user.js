import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { adminCollection, doctorsCollection, patientsCollection } from '../collections'
import { auth, storage } from '../config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const getUser = async (id, claim) => {
  const collection = claim === 'admin' ? adminCollection : claim === 'doctor' ? doctorsCollection : patientsCollection
  const docRef = doc(collection, id)

  return await getDoc(docRef)
    .then(doc => {
      if (!doc.exists()) {
        throw new Error('No se encontró el usuario.')
      }
      const id = doc.id
      const data = doc.data()
      return { ...data, id }
    })
}
export const updateUser = async (id, claim, update) => {
  const collection = claim === 'admin' ? adminCollection : claim === 'doctor' ? doctorsCollection : patientsCollection
  const docRef = doc(collection, id)

  return updateDoc(docRef, update)
}

export const uploadImage = async (file) => {
  const fileName = String(Date.now()) + '.' + file.name.split('.')[1]
  const path = '/profilePics'

  const imageRef = ref(storage, `/${path}/${fileName}`)

  try {
    await uploadBytesResumable(imageRef, file)
    const imageUrl = await getDownloadURL(imageRef)

    return { src: imageUrl, path: imageRef.fullPath }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Hubo un error al subir la imágen, inténtalo denuevo.'
    throw new Error(errorMessage)
  }
}

export const cerrarSesion = async () => {
  return await auth.signOut()
}
