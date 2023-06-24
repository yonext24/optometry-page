import { getDocs, limit, query, where } from 'firebase/firestore'
import { adminCollection, doctorsCollection, patientsCollection } from '../collections'
import { auth } from '../config'

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

export const cerrarSesion = async () => {
  return await auth.signOut()
}
