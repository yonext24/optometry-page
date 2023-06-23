import { doc, getDoc } from 'firebase/firestore'
import { adminCollection, doctorsCollection, patientsCollection } from '../collections'

export const getUser = async (id, claim) => {
  const collection = claim === 'admin' ? adminCollection : claim === 'doctor' ? doctorsCollection : patientsCollection
  console.log({ collection, claim, id })

  const docRef = doc(collection, id)

  return await getDoc(docRef)
    .then(doc => {
      if (!doc.exists()) {
        throw new Error('No se encontró el usuario.')
      }
      const data = doc.data()
      return { ...data }
    })
}
