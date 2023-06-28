import { getDocs, limit, query, where } from 'firebase/firestore'
import { adminCollection, doctorsCollection, patientsCollection } from '../collections'
import { auth, storage } from '../config'
import { getUserRole } from '../auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const getUser = async (email, claim) => {
  const collection = claim === 'admin' ? adminCollection : claim === 'doctor' ? doctorsCollection : patientsCollection
  const docRef = query(collection, where('email', '==', email), limit(1))

  return await getDocs(docRef)
    .then(docs => {
      if (docs.empty) {
        console.log('EMPTY')
        throw new Error('No se encontró el usuario.')
      }
      const id = docs.docs[0].id
      const data = docs.docs[0].data()
      return { ...data, id }
    })
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
